"use client"

import { forwardRef } from "react"

type CertificateData = {
  recipientName: string
  title: string
  description: string
  issuerName: string
  date: string
  signature: string
}

type CertificatePreviewProps = {
  data: CertificateData
  template: string
  color: string
}

export const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>(
  ({ data, template, color }, ref) => {
    const getTemplateStyles = () => {
      const baseStyles = "w-full aspect-[1.4/1] relative p-8 rounded-lg"
      const colorMap: Record<string, string> = {
        blue: "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300",
        green: "bg-gradient-to-r from-green-50 to-green-100 border-green-300",
        red: "bg-gradient-to-r from-red-50 to-red-100 border-red-300",
        purple: "bg-gradient-to-r from-purple-50 to-purple-100 border-purple-300",
        gold: "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300",
      }

      const templateMap: Record<string, string> = {
        elegant: "border-8 border-double",
        modern: "border-4",
        classic: "border-8",
        minimal: "border-2",
      }

      return `${baseStyles} ${colorMap[color] || colorMap.blue} ${templateMap[template] || templateMap.elegant}`
    }

    const getHeaderStyles = () => {
      const colorMap: Record<string, string> = {
        blue: "text-blue-800",
        green: "text-green-800",
        red: "text-red-800",
        purple: "text-purple-800",
        gold: "text-amber-800",
      }

      return `text-center ${colorMap[color] || colorMap.blue}`
    }

    const getAccentStyles = () => {
      const colorMap: Record<string, string> = {
        blue: "text-blue-600",
        green: "text-green-600",
        red: "text-red-600",
        purple: "text-purple-600",
        gold: "text-amber-600",
      }

      return colorMap[color] || colorMap.blue
    }

    const getBorderStyles = () => {
      const colorMap: Record<string, string> = {
        blue: "border-blue-200",
        green: "border-green-200",
        red: "border-red-200",
        purple: "border-purple-200",
        gold: "border-amber-200",
      }

      return colorMap[color] || colorMap.blue
    }

    return (
      <div ref={ref} className={getTemplateStyles()}>
        <div className="h-full flex flex-col justify-between">
          <div className={`text-center ${getHeaderStyles()}`}>
            <h1 className="text-3xl font-serif font-bold mb-1">{data.title || "Certificate of Achievement"}</h1>
            <div className={`mx-auto w-1/2 h-1 ${getBorderStyles()} border-b-2 mb-6`}></div>

            <div className="my-4">
              <p className="text-lg mb-1">This is to certify that</p>
              <h2 className={`text-4xl font-bold my-4 ${getAccentStyles()}`}>
                {data.recipientName || "Recipient Name"}
              </h2>
              <p className="text-lg mb-6">{data.description || "Has successfully completed the requirements"}</p>
            </div>
          </div>

          <div className="flex justify-between items-end pt-8">
            <div className="text-center">
              <div className={`border-t-2 ${getBorderStyles()} pt-2 w-32`}>
                <p className="text-sm">Date</p>
                <p className="font-medium">{data.date}</p>
              </div>
            </div>

            <div className="text-center">
              <div className={`border-t-2 ${getBorderStyles()} pt-2 w-32`}>
                <p className="text-sm">Signature</p>
                <p className="font-medium">{data.signature || "Signature"}</p>
              </div>
            </div>
          </div>

          {data.issuerName && (
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-sm text-gray-600">Issued by {data.issuerName}</p>
            </div>
          )}

          {template === "elegant" && (
            <>
              <div className="absolute top-0 left-0 w-24 h-24 border-t-8 border-l-8 rounded-tl-lg border-opacity-50"></div>
              <div className="absolute top-0 right-0 w-24 h-24 border-t-8 border-r-8 rounded-tr-lg border-opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b-8 border-l-8 rounded-bl-lg border-opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-8 border-r-8 rounded-br-lg border-opacity-50"></div>
            </>
          )}
        </div>
      </div>
    )
  },
)

CertificatePreview.displayName = "CertificatePreview"
