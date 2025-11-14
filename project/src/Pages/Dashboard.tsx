import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Mensaje {
  nombre: string;
  email: string;
  mensaje: string;
  fecha: { seconds: number };
}

export default function Dashboard() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [chartData, setChartData] = useState<{ fecha: string; total: number }[]>([]);

  useEffect(() => {
    const fetchMensajes = async () => {
      const querySnapshot = await getDocs(collection(db, 'mensajes'));
      const docs: Mensaje[] = querySnapshot.docs.map((doc) => doc.data() as Mensaje);
      setMensajes(docs);

      // Agrupar mensajes por día
      const grouped = docs.reduce((acc, m) => {
        const fecha = new Date(m.fecha?.seconds * 1000).toLocaleDateString();
        acc[fecha] = (acc[fecha] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const chartArray = Object.entries(grouped).map(([fecha, total]) => ({ fecha, total }));
      setChartData(chartArray);
    };

    fetchMensajes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Panel Interno – Portafolio</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Gráfico de actividad */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Mensajes por día</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Últimos mensajes */}
        <div className="bg-white rounded-2xl shadow p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Últimos mensajes</h2>
          <ul className="space-y-3">
            {mensajes.slice(-5).reverse().map((m, i) => (
              <li key={i} className="border-b pb-2">
                <p className="font-semibold">{m.nombre}</p>
                <p className="text-sm text-gray-600">{m.email}</p>
                <p className="text-gray-800">{m.mensaje}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
