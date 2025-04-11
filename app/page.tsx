import { CertificateGenerator } from "@/components/certificate-generator"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Certificate Generator</h1>
      <p className="text-center text-gray-600 mb-8">
        Create beautiful certificates by describing your design preferences and content
      </p>
      <CertificateGenerator />
    </main>
  )
}
