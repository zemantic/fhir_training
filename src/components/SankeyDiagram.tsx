import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";

interface SankeyNode {
  id: string;
  name: string;
  category: "codesystem" | "valueset";
  description: string;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

const SankeyDiagram: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const data: SankeyData = {
    nodes: [
      // CodeSystems (left side)
      {
        id: "snomed",
        name: "SNOMED CT",
        category: "codesystem",
        description: "Clinical terminology for healthcare",
      },
      {
        id: "loinc",
        name: "LOINC",
        category: "codesystem",
        description: "Laboratory and clinical observations",
      },
      {
        id: "icd10cm",
        name: "ICD-10-CM",
        category: "codesystem",
        description: "Diagnosis codes",
      },
      {
        id: "rxnorm",
        name: "RxNorm",
        category: "codesystem",
        description: "Medication codes",
      },
      {
        id: "cpt",
        name: "CPT",
        category: "codesystem",
        description: "Procedure codes",
      },
      {
        id: "ucum",
        name: "UCUM",
        category: "codesystem",
        description: "Units of measure",
      },
      {
        id: "hl7v3",
        name: "HL7 v3",
        category: "codesystem",
        description: "Administrative codes",
      },

      // ValueSets (right side)
      {
        id: "clinical-findings",
        name: "Clinical Findings",
        category: "valueset",
        description: "Signs, symptoms, and conditions",
      },
      {
        id: "lab-tests",
        name: "Laboratory Tests",
        category: "valueset",
        description: "Lab test panels and individual tests",
      },
      {
        id: "medications",
        name: "Medications",
        category: "valueset",
        description: "Pharmaceutical products",
      },
      {
        id: "procedures",
        name: "Procedures",
        category: "valueset",
        description: "Medical procedures and interventions",
      },
      {
        id: "diagnoses",
        name: "Diagnoses",
        category: "valueset",
        description: "Disease classifications",
      },
      {
        id: "vital-signs",
        name: "Vital Signs",
        category: "valueset",
        description: "Patient vital measurements",
      },
      {
        id: "allergies",
        name: "Allergies",
        category: "valueset",
        description: "Allergen and intolerance codes",
      },
      {
        id: "body-sites",
        name: "Body Sites",
        category: "valueset",
        description: "Anatomical locations",
      },
      {
        id: "admin-data",
        name: "Administrative",
        category: "valueset",
        description: "Patient demographics and admin",
      },
    ],
    links: [
      // SNOMED CT connections
      { source: "snomed", target: "clinical-findings", value: 25 },
      { source: "snomed", target: "procedures", value: 20 },
      { source: "snomed", target: "allergies", value: 15 },
      { source: "snomed", target: "body-sites", value: 18 },
      { source: "snomed", target: "medications", value: 8 },

      // LOINC connections
      { source: "loinc", target: "lab-tests", value: 30 },
      { source: "loinc", target: "vital-signs", value: 20 },
      { source: "loinc", target: "clinical-findings", value: 10 },

      // ICD-10-CM connections
      { source: "icd10cm", target: "diagnoses", value: 35 },
      { source: "icd10cm", target: "clinical-findings", value: 12 },

      // RxNorm connections
      { source: "rxnorm", target: "medications", value: 40 },
      { source: "rxnorm", target: "allergies", value: 8 },

      // CPT connections
      { source: "cpt", target: "procedures", value: 30 },
      { source: "cpt", target: "lab-tests", value: 15 },

      // UCUM connections
      { source: "ucum", target: "vital-signs", value: 15 },
      { source: "ucum", target: "lab-tests", value: 20 },

      // HL7 v3 connections
      { source: "hl7v3", target: "admin-data", value: 25 },
      { source: "hl7v3", target: "clinical-findings", value: 8 },
    ],
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create sankey generator
    const sankeyGenerator = sankey<SankeyNode, SankeyLink>()
      .nodeId((d: any) => d.id)
      .nodeWidth(15)
      .nodePadding(20)
      .size([width, height]);

    // Prepare data
    const sankeyData = sankeyGenerator({
      nodes: data.nodes.map((d) => ({ ...d })),
      links: data.links.map((d) => ({ ...d })),
    });

    // Color scales
    const codeSystemColors: { [key: string]: string } = {
      snomed: "#E11D48", // Rose - for comprehensive clinical terminology
      loinc: "#7C3AED", // Violet - for lab and observations
      icd10cm: "#DC2626", // Red - for diagnoses
      rxnorm: "#059669", // Emerald - for medications
      cpt: "#2563EB", // Blue - for procedures
      ucum: "#EA580C", // Orange - for units
      hl7v3: "#7C2D12", // Brown - for administrative
    };
    const valueSetColor = "#10B981"; // Green

    g.append("g")
      .selectAll(".link")
      .data(sankeyData.links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", (d: any) => codeSystemColors[d.source.id] || "#6B7280")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", (d: any) => Math.max(1, d.width))
      .attr("fill", "none")
      .on("mouseover", function (event, d: any) {
        d3.select(this).attr("stroke-opacity", 0.8);

        // Show tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0)
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.8)")
          .style("color", "white")
          .style("padding", "8px 12px")
          .style("border-radius", "4px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("z-index", "1000");

        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(
            `${d.source.name} → ${d.target.name}<br/>Flow: ${d.value} connections`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke-opacity", 0.4);
        d3.selectAll(".tooltip").remove();
      });

    // Draw nodes
    const nodes = g
      .append("g")
      .selectAll(".node")
      .data(sankeyData.nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.x0}, ${d.y0})`);

    // Node rectangles
    nodes
      .append("rect")
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("fill", (d: any) =>
        d.category === "codesystem" ? codeSystemColors[d.id] : valueSetColor
      )
      .attr("rx", 4)
      .attr("stroke", "none")
      .on("mouseover", function (event, d: any) {
        d3.select(this).attr("opacity", 0.8);

        // Show tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0)
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.8)")
          .style("color", "white")
          .style("padding", "8px 12px")
          .style("border-radius", "4px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("z-index", "1000");

        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(`<strong>${d.name}</strong><br/>${d.description}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 1);
        d3.selectAll(".tooltip").remove();
      });

    // Node labels
    nodes
      .append("text")
      .attr("x", (d: any) => (d.x0 < width / 2 ? d.x1 - d.x0 + 6 : -6))
      .attr("y", (d: any) => (d.y1 - d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => (d.x0 < width / 2 ? "start" : "end"))
      .attr("font-family", "Inter, sans-serif")
      .attr("font-size", "12px")
      .attr("font-weight", "500")
      .attr("fill", "#1F2937")
      .text((d: any) => d.name);
  }, []);

  return (
    <div className="w-full">
      <svg
        ref={svgRef}
        width="1000"
        height="600"
        className="w-full h-auto border border-gray-200 rounded-lg bg-white shadow-sm"
      />
    </div>
  );
};

export default SankeyDiagram;
