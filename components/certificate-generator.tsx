"use client"

import type React from "react"

import { useState, useRef } from "react"
import { toPng } from "html-to-image"
import { jsPDF } from "jspdf"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Certificate } from "@/components/certificate"
import { LoadingState } from "@/components/loading-state"
import { processPrompt } from "@/lib/prompt-processor"
import { FileImage, FileIcon as FilePdf } from "lucide-react"

export function CertificateGenerator() {
  const [certificateData, setCertificateData] = useState({
    recipientName: "",
    title: "Certificate of Achievement",
    description: "",
    issuerName: "",
    date: new Date().toLocaleDateString(),
    signature: "",
    prompt: "",
  })

  const [designOptions, setDesignOptions] = useState({
    template: "elegant",
    color: "gold",
    font: "serif",
    borderStyle: "double",
    borderWidth: 8,
    orientation: "landscape",
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCertificateData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDesignOptionChange = (option: string, value: string | number) => {
    setDesignOptions((prev) => ({ ...prev, [option]: value }))
  }

  const handlePromptSubmit = () => {
    setIsGenerating(true)
    setIsGenerated(false)

    // Simulate processing the prompt and generating the certificate
    setTimeout(() => {
      const result = processPrompt(certificateData.prompt)

      // Update certificate data with extracted information
      setCertificateData((prev) => ({
        ...prev,
        ...result,
      }))

      // Extract design preferences from prompt
      const designPrefs = extractDesignPreferences(certificateData.prompt)
      setDesignOptions((prev) => ({
        ...prev,
        ...designPrefs,
      }))

      setIsGenerating(false)
      setIsGenerated(true)
    }, 2000)
  }

  const extractDesignPreferences = (prompt: string) => {
    const prefs: Partial<typeof designOptions> = {}

    // Extract color preference
    const colorPatterns = [
      { regex: /\b(blue|azure|navy|cyan)\b/i, value: "blue" },
      { regex: /\b(green|emerald|mint|olive)\b/i, value: "green" },
      { regex: /\b(red|crimson|maroon|ruby)\b/i, value: "red" },
      { regex: /\b(purple|violet|lavender|plum)\b/i, value: "purple" },
      { regex: /\b(gold|yellow|amber|bronze)\b/i, value: "gold" },
      { regex: /\b(black|dark|obsidian)\b/i, value: "black" },
      { regex: /\b(teal|turquoise|aqua)\b/i, value: "teal" },
    ]

    for (const pattern of colorPatterns) {
      if (pattern.regex.test(prompt)) {
        prefs.color = pattern.value
        break
      }
    }

    // Extract template style
    const templatePatterns = [
      { regex: /\b(elegant|luxury|premium|fancy)\b/i, value: "elegant" },
      { regex: /\b(modern|sleek|clean|minimal)\b/i, value: "modern" },
      { regex: /\b(classic|traditional|formal|standard)\b/i, value: "classic" },
      { regex: /\b(vintage|retro|old|antique)\b/i, value: "vintage" },
      { regex: /\b(corporate|business|professional)\b/i, value: "corporate" },
      { regex: /\b(academic|education|diploma|school)\b/i, value: "academic" },
    ]

    for (const pattern of templatePatterns) {
      if (pattern.regex.test(prompt)) {
        prefs.template = pattern.value
        break
      }
    }

    // Extract font style
    const fontPatterns = [
      { regex: /\b(serif|traditional font|classic font)\b/i, value: "serif" },
      { regex: /\b(sans|sans-serif|modern font|clean font)\b/i, value: "sans-serif" },
      { regex: /\b(cursive|script|handwriting|calligraphy)\b/i, value: "cursive" },
      { regex: /\b(monospace|typewriter|code)\b/i, value: "monospace" },
    ]

    for (const pattern of fontPatterns) {
      if (pattern.regex.test(prompt)) {
        prefs.font = pattern.value
        break
      }
    }

    return prefs
  }

  const downloadAsPNG = () => {
    if (!certificateRef.current) return

    toPng(certificateRef.current, { quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement("a")
        link.download = `${certificateData.recipientName.replace(/\s+/g, "-") || "certificate"}.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.error("Error generating certificate image:", err)
      })
  }

  const downloadAsPDF = () => {
    if (!certificateRef.current) return

    toPng(certificateRef.current, { quality: 0.95 })
      .then((dataUrl) => {
        const pdf = new jsPDF(designOptions.orientation === "landscape" ? "landscape" : "portrait", "mm", "a4")

        const imgProps = pdf.getImageProperties(dataUrl)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = imgProps.width
        const imgHeight = imgProps.height

        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
        const imgX = (pdfWidth - imgWidth * ratio) / 2
        const imgY = (pdfHeight - imgHeight * ratio) / 2

        pdf.addImage(dataUrl, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
        pdf.save(`${certificateData.recipientName.replace(/\s+/g, "-") || "certificate"}.pdf`)
      })
      .catch((err) => {
        console.error("Error generating PDF:", err)
      })
  }

  return (
    <div className="grid gap-8">
      {/* Prompt Input Section */}
      <div className="space-y-4 max-w-2xl mx-auto w-full">
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-lg">
            Design Prompt
          </Label>
          <Textarea
            id="prompt"
            name="prompt"
            placeholder="Describe your certificate design and content (e.g., 'Create an elegant gold certificate with ornate borders for a programming competition awarded to Jane Doe')"
            className="min-h-[100px]"
            value={certificateData.prompt}
            onChange={handleInputChange}
          />
          <Button
            onClick={handlePromptSubmit}
            className="w-full"
            disabled={isGenerating || !certificateData.prompt.trim()}
            size="lg"
          >
            {isGenerating ? "Generating Certificate..." : "Generate Certificate"}
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isGenerating && <LoadingState />}

      {/* Generated Certificate */}
      {isGenerated && !isGenerating && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Certificate</h2>
            <div className="flex gap-2">
              <Button onClick={downloadAsPNG} variant="outline" className="flex items-center gap-2">
                <FileImage className="h-4 w-4" />
                Download PNG
              </Button>
              <Button onClick={downloadAsPDF} variant="outline" className="flex items-center gap-2">
                <FilePdf className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
            <div className="max-w-4xl mx-auto">
              <Certificate ref={certificateRef} data={certificateData} design={designOptions} />
            </div>
          </div>

          {/* Certificate Customization Options */}
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            <AccordionItem value="customize">
              <AccordionTrigger>Customize Certificate</AccordionTrigger>
              <AccordionContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="design">Design</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipientName">Recipient Name</Label>
                      <Input
                        id="recipientName"
                        name="recipientName"
                        placeholder="John Doe"
                        value={certificateData.recipientName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Certificate Title</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Certificate of Achievement"
                        value={certificateData.title}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description/Achievement</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="For outstanding performance in..."
                        value={certificateData.description}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="issuerName">Issuer/Organization</Label>
                      <Input
                        id="issuerName"
                        name="issuerName"
                        placeholder="Company/Organization Name"
                        value={certificateData.issuerName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="text"
                        placeholder="April 9, 2023"
                        value={certificateData.date}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signature">Signature</Label>
                      <Input
                        id="signature"
                        name="signature"
                        placeholder="Dr. Jane Smith"
                        value={certificateData.signature}
                        onChange={handleInputChange}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="design" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Template Style</Label>
                      <Select
                        value={designOptions.template}
                        onValueChange={(value) => handleDesignOptionChange("template", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="elegant">Elegant</SelectItem>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="vintage">Vintage</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Color Scheme</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {["gold", "blue", "green", "red", "purple", "teal", "black", "gray"].map((color) => (
                          <div
                            key={color}
                            className={`h-10 rounded-md cursor-pointer border-2 ${
                              designOptions.color === color ? "ring-2 ring-offset-2 ring-black" : ""
                            }`}
                            style={{
                              backgroundColor: getColorValue(color),
                              borderColor: getBorderColorValue(color),
                            }}
                            onClick={() => handleDesignOptionChange("color", color)}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Font Family</Label>
                      <RadioGroup
                        value={designOptions.font}
                        onValueChange={(value) => handleDesignOptionChange("font", value)}
                        className="flex flex-wrap gap-2"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-2">
                          <RadioGroupItem value="serif" id="font-serif" />
                          <Label htmlFor="font-serif" className="font-serif">
                            Serif
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-2">
                          <RadioGroupItem value="sans-serif" id="font-sans" />
                          <Label htmlFor="font-sans" className="font-sans">
                            Sans-serif
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-2">
                          <RadioGroupItem value="cursive" id="font-cursive" />
                          <Label htmlFor="font-cursive" style={{ fontFamily: "cursive" }}>
                            Cursive
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-2">
                          <RadioGroupItem value="monospace" id="font-mono" />
                          <Label htmlFor="font-mono" className="font-mono">
                            Monospace
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Border Style</Label>
                      <Select
                        value={designOptions.borderStyle}
                        onValueChange={(value) => handleDesignOptionChange("borderStyle", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select border style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solid">Solid</SelectItem>
                          <SelectItem value="double">Double</SelectItem>
                          <SelectItem value="dashed">Dashed</SelectItem>
                          <SelectItem value="dotted">Dotted</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Border Width</Label>
                        <span>{designOptions.borderWidth}px</span>
                      </div>
                      <Slider
                        value={[designOptions.borderWidth as number]}
                        min={0}
                        max={12}
                        step={1}
                        onValueChange={(value) => handleDesignOptionChange("borderWidth", value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Orientation</Label>
                      <RadioGroup
                        value={designOptions.orientation}
                        onValueChange={(value) => handleDesignOptionChange("orientation", value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="landscape" id="landscape" />
                          <Label htmlFor="landscape">Landscape</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="portrait" id="portrait" />
                          <Label htmlFor="portrait">Portrait</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-4">
                  <Button
                    onClick={() => {
                      setIsGenerated(true)
                    }}
                    className="w-full"
                  >
                    Update Certificate
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  )
}

// Helper function to get color values
function getColorValue(color: string): string {
  const colorMap: Record<string, string> = {
    gold: "#f9d77e",
    blue: "#a8c7fa",
    green: "#a7e3a5",
    red: "#f9a8a8",
    purple: "#d8b4fe",
    teal: "#a5f3eb",
    black: "#2d3748",
    gray: "#cbd5e0",
  }
  return colorMap[color] || colorMap.gold
}

// Helper function to get border color values
function getBorderColorValue(color: string): string {
  const colorMap: Record<string, string> = {
    gold: "#eab308",
    blue: "#3b82f6",
    green: "#22c55e",
    red: "#ef4444",
    purple: "#a855f7",
    teal: "#14b8a6",
    black: "#1e293b",
    gray: "#94a3b8",
  }
  return colorMap[color] || colorMap.gold
}
