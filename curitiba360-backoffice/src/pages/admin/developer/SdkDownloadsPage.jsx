import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Download, Code, Smartphone } from 'lucide-react';

export default function SdkDownloadsPage() {
  const sdks = [
    { name: 'JavaScript / TypeScript SDK', language: 'Node.js / Web', package: '@curitiba360/sdk-js', version: 'v2.4.0', status: 'oficial' },
    { name: 'React Native & Expo SDK', language: 'Mobile Cross-platform', package: '@curitiba360/react-native', version: 'v1.8.2', status: 'oficial' },
    { name: 'Flutter & Dart SDK', language: 'Mobile Cross-platform', package: 'curitiba360_flutter', version: 'v1.5.0', status: 'oficial' },
    { name: 'Python SDK', language: 'Backend & Data Science', package: 'curitiba360-python', version: 'v2.1.0', status: 'oficial' },
    { name: 'Java & Spring Boot SDK', language: 'Enterprise Backend', package: 'com.curitiba360:sdk', version: 'v3.0.0', status: 'oficial' },
    { name: '.NET C# SDK', language: 'Enterprise Backend', package: 'Curitiba360.SDK', version: 'v2.2.1', status: 'oficial' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          SDKs Oficiais & Bibliotecas 📦
        </h1>
        <p className="mt-2 text-gray-500">Download e documentação dos SDKs oficiais para JS, TS, Flutter, React Native, Java, .NET e Python.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {sdks.map(sdk => (
          <Card key={sdk.package} className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 uppercase">{sdk.language}</span>
              <Badge variant="blue">{sdk.status}</Badge>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{sdk.name}</h2>
            <code className="text-xs font-mono bg-slate-900 text-slate-200 p-2 rounded block">
              npm install {sdk.package}
            </code>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-500 font-semibold">Versão: {sdk.version}</span>
              <button className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition flex items-center gap-1">
                <Download size={14} /> Baixar SDK
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
