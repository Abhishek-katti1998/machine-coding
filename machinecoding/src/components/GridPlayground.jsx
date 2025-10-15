import { useMemo, useState } from "react";
import "./FlexGrid.css";

function LabeledInput({ label, value, onChange, placeholder }) {
  return (
    <div className="control-row">
      <label>{label}</label>
      <input className="inline-input" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function LabeledNumber({ label, value, onChange, min = 0, max = 12 }) {
  return (
    <div className="control-row">
      <label>{label}</label>
      <input className="inline-input" type="number" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

export default function GridPlayground() {
  const [columns, setColumns] = useState("repeat(4, minmax(80px, 1fr))");
  const [rows, setRows] = useState("auto");
  const [gap, setGap] = useState(8);
  const [rowGap, setRowGap] = useState(8);
  const [columnGap, setColumnGap] = useState(8);
  const [autoFlow, setAutoFlow] = useState("row");
  const [itemCount, setItemCount] = useState(8);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [itemOverrides, setItemOverrides] = useState({}); // key: index (1-based)

  const containerStyle = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: columns,
      gridTemplateRows: rows,
      gap,
      rowGap,
      columnGap,
      gridAutoFlow: autoFlow,
      minHeight: 180,
    }),
    [columns, rows, gap, rowGap, columnGap, autoFlow]
  );

  const items = useMemo(() => Array.from({ length: itemCount }, (_, i) => i + 1), [itemCount]);

  return (
    <section>
      <h2>Grid Playground</h2>
      <p className="subtle">Edit template definitions to see how CSS Grid places items.</p>
      <div className="playground-root">
        <aside className="controls-panel">
          <h3>Container</h3>
          <LabeledInput label="grid-template-columns" value={columns} onChange={setColumns} placeholder="e.g. repeat(4, 1fr)" />
          <LabeledInput label="grid-template-rows" value={rows} onChange={setRows} placeholder="e.g. 100px auto" />
          <LabeledNumber label="gap (px)" value={gap} onChange={setGap} min={0} max={48} />
          <LabeledNumber label="row-gap (px)" value={rowGap} onChange={setRowGap} min={0} max={48} />
          <LabeledNumber label="column-gap (px)" value={columnGap} onChange={setColumnGap} min={0} max={48} />
          <div className="control-row">
            <label>grid-auto-flow</label>
            <select className="inline-input" value={autoFlow} onChange={(e) => setAutoFlow(e.target.value)}>
              {['row', 'column', 'dense', 'row dense', 'column dense'].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="divider" />
          <h3>Items</h3>
          <LabeledNumber label="items" value={itemCount} onChange={setItemCount} min={1} max={24} />
          <LabeledNumber label="selected item" value={selectedIndex} onChange={setSelectedIndex} min={1} max={itemCount} />
          <LabeledInput
            label="grid-column"
            value={itemOverrides[selectedIndex]?.gridColumn ?? "auto"}
            onChange={(v) => setItemOverrides((prev) => ({ ...prev, [selectedIndex]: { ...prev[selectedIndex], gridColumn: v } }))}
            placeholder="e.g. 1 / 3 or 2 / span 2"
          />
          <LabeledInput
            label="grid-row"
            value={itemOverrides[selectedIndex]?.gridRow ?? "auto"}
            onChange={(v) => setItemOverrides((prev) => ({ ...prev, [selectedIndex]: { ...prev[selectedIndex], gridRow: v } }))}
            placeholder="e.g. 1 / 3 or 2 / span 2"
          />
          <div className="control-row">
            <label>justify-self</label>
            <select
              className="inline-input"
              value={itemOverrides[selectedIndex]?.justifySelf ?? "stretch"}
              onChange={(e) => setItemOverrides((prev) => ({ ...prev, [selectedIndex]: { ...prev[selectedIndex], justifySelf: e.target.value } }))}
            >
              {['auto', 'stretch', 'start', 'center', 'end'].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="control-row">
            <label>align-self</label>
            <select
              className="inline-input"
              value={itemOverrides[selectedIndex]?.alignSelf ?? "stretch"}
              onChange={(e) => setItemOverrides((prev) => ({ ...prev, [selectedIndex]: { ...prev[selectedIndex], alignSelf: e.target.value } }))}
            >
              {['auto', 'stretch', 'start', 'center', 'end'].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </aside>

        <div className="showcase" style={containerStyle}>
          {items.map((n) => (
            <div
              key={n}
              className="item"
              style={{
                ...(itemOverrides[n]?.gridColumn ? { gridColumn: itemOverrides[n].gridColumn } : {}),
                ...(itemOverrides[n]?.gridRow ? { gridRow: itemOverrides[n].gridRow } : {}),
                ...(itemOverrides[n]?.justifySelf ? { justifySelf: itemOverrides[n].justifySelf } : {}),
                ...(itemOverrides[n]?.alignSelf ? { alignSelf: itemOverrides[n].alignSelf } : {}),
              }}
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


