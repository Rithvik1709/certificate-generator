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

type DesignOptions = {
  template: string
  color: string
  font: string
  borderStyle: string
  borderWidth: number
  orientation: string
}

type CertificateProps = {
  data: CertificateData
  design: DesignOptions
}

export const Certificate = forwardRef<HTMLDivElement, CertificateProps>(({ data, design }, ref) => {
  const getContainerStyles = () => {
    const baseStyles = "relative p-8 rounded-lg"
    const orientationStyles = design.orientation === "landscape" ? "w-full aspect-[1.4/1]" : "w-full aspect-[0.7/1]"

    return `${baseStyles} ${orientationStyles}`
  }

  const getBorderStyles = () => {
    if (design.borderStyle === "none") return ""

    return `border-${design.borderStyle} border-[${design.borderWidth}px]`
  }

  const getBackgroundStyles = () => {
    const colorMap: Record<string, string> = {
      gold: "bg-gradient-to-r from-amber-50 to-amber-100",
      blue: "bg-gradient-to-r from-blue-50 to-blue-100",
      green: "bg-gradient-to-r from-green-50 to-green-100",
      red: "bg-gradient-to-r from-red-50 to-red-100",
      purple: "bg-gradient-to-r from-purple-50 to-purple-100",
      teal: "bg-gradient-to-r from-teal-50 to-teal-100",
      black: "bg-gradient-to-r from-gray-100 to-gray-200",
      gray: "bg-gradient-to-r from-gray-50 to-gray-100",
    }

    return colorMap[design.color] || colorMap.gold
  }

  const getAccentColor = () => {
    const colorMap: Record<string, string> = {
      gold: "text-amber-700",
      blue: "text-blue-700",
      green: "text-green-700",
      red: "text-red-700",
      purple: "text-purple-700",
      teal: "text-teal-700",
      black: "text-gray-800",
      gray: "text-gray-700",
    }

    return colorMap[design.color] || colorMap.gold
  }

  const getBorderColor = () => {
    const colorMap: Record<string, string> = {
      gold: "border-amber-300",
      blue: "border-blue-300",
      green: "border-green-300",
      red: "border-red-300",
      purple: "border-purple-300",
      teal: "border-teal-300",
      black: "border-gray-400",
      gray: "border-gray-300",
    }

    return colorMap[design.color] || colorMap.gold
  }

  const getFontFamily = () => {
    const fontMap: Record<string, string> = {
      serif: "font-serif",
      "sans-serif": "font-sans",
      cursive: "font-['cursive']",
      monospace: "font-mono",
    }

    return fontMap[design.font] || fontMap.serif
  }

  const getTemplateElements = () => {
    switch (design.template) {
      case "elegant":
        return (
          <>
            <div
              className={`absolute top-4 left-4 right-4 h-2 ${getBorderColor()}`}
              style={{ borderTopStyle: design.borderStyle, borderTopWidth: Math.max(1, design.borderWidth / 2) }}
            ></div>
            <div
              className={`absolute bottom-4 left-4 right-4 h-2 ${getBorderColor()}`}
              style={{ borderBottomStyle: design.borderStyle, borderBottomWidth: Math.max(1, design.borderWidth / 2) }}
            ></div>
            <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 rounded-tl-lg opacity-50"></div>
            <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 rounded-tr-lg opacity-50"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 rounded-bl-lg opacity-50"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 rounded-br-lg opacity-50"></div>
          </>
        )
      case "modern":
        return (
          <>
            <div className={`absolute top-0 left-0 right-0 h-2 ${getAccentColor().replace("text-", "bg-")}`}></div>
            <div className={`absolute bottom-0 left-0 right-0 h-2 ${getAccentColor().replace("text-", "bg-")}`}></div>
          </>
        )
      case "vintage":
        return (
          <>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5"></div>
            <div
              className={`absolute top-6 left-6 right-6 bottom-6 border ${getBorderColor()}`}
              style={{ borderStyle: "double", borderWidth: Math.max(3, design.borderWidth / 2) }}
            ></div>
          </>
        )
      case "corporate":
        return (
          <>
            <div
              className={`absolute top-0 left-0 w-32 h-32 ${getAccentColor().replace("text-", "bg-")} opacity-10`}
            ></div>
            <div
              className={`absolute bottom-0 right-0 w-32 h-32 ${getAccentColor().replace("text-", "bg-")} opacity-10`}
            ></div>
          </>
        )
      case "academic":
        return (
          <>
            <div
              className={`absolute top-0 left-0 right-0 h-16 ${getAccentColor().replace("text-", "bg-")} opacity-10`}
            ></div>
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gray-200 opacity-30"></div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div
      ref={ref}
      className={`${getContainerStyles()} ${getBackgroundStyles()} ${getBorderStyles()} ${getBorderColor()} ${getFontFamily()}`}
      style={{
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
      }}
    >
      {getTemplateElements()}

      <div className="h-full flex flex-col justify-between relative z-10">
        <div className="text-center">
          <h1 className={`text-3xl md:text-4xl font-bold mb-1 ${getAccentColor()}`}>
            {data.title || "Certificate of Achievement"}
          </h1>
          <div className={`mx-auto w-1/2 h-1 ${getBorderColor()} border-b-2 mb-6`}></div>

          <div className="my-4 md:my-8">
            <p className="text-lg mb-1">This is to certify that</p>
            <h2 className={`text-3xl md:text-5xl font-bold my-4 ${getAccentColor()}`}>
              {data.recipientName || "Recipient Name"}
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              {data.description || "Has successfully completed the requirements"}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-end pt-8">
          <div className="text-center">
            <div className={`border-t-2 ${getBorderColor()} pt-2 w-32`}>
              <p className="text-sm">Date</p>
              <p className="font-medium">{data.date}</p>
            </div>
          </div>

          <div className="text-center">
            <div className={`border-t-2 ${getBorderColor()} pt-2 w-32`}>
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
      </div>
    </div>
  )
})

Certificate.displayName = "Certificate"
