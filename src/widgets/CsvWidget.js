import { saveAs } from "file-saver";

export default function CsvWidget({ rows, filename = "report" }) {
  const downloadCsv = () => {
    const csvContent = rows.map(row =>
      row.map(cell =>
        typeof cell === 'string' && cell.includes(',')
          ? `"${cell}"`
          : cell
      ).join(",")
    ).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const previewRows = rows.slice(0, 4); // Show first 4 rows as preview

  return (
    <div style={{ padding: "8px" }}>
      <h4 style={{ margin: "0 0 8px 0", color: "#333", fontSize: "14px" }}>
        📋 Report Ready
      </h4>

      {/* Preview Table */}
      <div style={{
        fontSize: "11px",
        marginBottom: "12px",
        border: "1px solid #b6d7a8", // Excel-like green border
        borderRadius: "4px",
        overflow: "hidden",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {previewRows.map((row, idx) => (
              <tr key={idx} style={{
                backgroundColor: idx === 0
                  ? "#227346" // Excel header green
                  : idx % 2 === 0
                    ? "#f3f6fb" // Excel alternate row blue
                    : "#ffffff"
              }}>
                {row.slice(0, 3).map((cell, cellIdx) => (
                  <td key={cellIdx} style={{
                    padding: "6px 8px",
                    border: "1px solid #dde2e6", // Excel grid lines
                    fontWeight: idx === 0 ? "bold" : "normal",
                    color: idx === 0 ? "#FFFFFF" : "#222"
                  }}>
                    {String(cell).length > 15 ?
                      String(cell).substring(0, 12) + "..." :
                      cell
                    }
                  </td>
                ))}
                {row.length > 3 && (
                  <td style={{
                    padding: "6px 8px",
                    border: "1px solid #dde2e6",
                    color: "#666",
                    background: idx === 0 ? "#d9ead3" : "#f9f9f9"
                  }}>
                    +{row.length - 3} more
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={downloadCsv}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "12px",
          width: "100%"
        }}
      >
        📥 Download Full Report ({rows.length} rows)
      </button>
    </div>
  );
}
