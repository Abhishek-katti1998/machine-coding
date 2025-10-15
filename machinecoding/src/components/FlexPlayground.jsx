import { useMemo, useState } from "react";
import "./FlexGrid.css";

function LabeledSelect({ label, value, onChange, options }) {
  return (
    <div className="control-row">
      <label>{label}</label>
      <select className="inline-input" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function LabeledNumber({ label, value, onChange, min = 0, max = 10 }) {
  return (
    <div className="control-row">
      <label>{label}</label>
      <input
        className="inline-input"
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export default function FlexPlayground() {
  const [direction, setDirection] = useState("row");
  const [wrap, setWrap] = useState("nowrap");
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [alignContent, setAlignContent] = useState("stretch");
  const [gap, setGap] = useState(8);
  const [itemCount, setItemCount] = useState(5);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [itemOverrides, setItemOverrides] = useState({}); // key: index (1-based)

  const containerStyle = useMemo(
    () => ({
      display: "flex",
      flexDirection: direction,
      flexWrap: wrap,
      justifyContent,
      alignItems,
      alignContent,
      gap,
      minHeight: 180,
    }),
    [direction, wrap, justifyContent, alignItems, alignContent, gap]
  );

  const items = useMemo(() => Array.from({ length: itemCount }, (_, i) => i + 1), [itemCount]);

  return (
    <section>
      <h2>Flexbox Playground</h2>
      <p className="subtle">Interact with controls to see how each flex property affects layout.</p>
      <div className="playground-root">
        <aside className="controls-panel">
          <h3>Container</h3>
          <LabeledSelect
            label="flex-direction"
            value={direction}
            onChange={setDirection}
            options={["row", "row-reverse", "column", "column-reverse"]}
          />
          <LabeledSelect label="flex-wrap" value={wrap} onChange={setWrap} options={["nowrap", "wrap", "wrap-reverse"]} />
          <LabeledSelect
            label="justify-content"
            value={justifyContent}
            onChange={setJustifyContent}
            options={["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"]}
          />
          <LabeledSelect label="align-items" value={alignItems} onChange={setAlignItems} options={["stretch", "flex-start", "center", "flex-end", "baseline"]} />
          <LabeledSelect label="align-content" value={alignContent} onChange={setAlignContent} options={["stretch", "flex-start", "center", "flex-end", "space-between", "space-around"]} />
          <LabeledNumber label="gap (px)" value={gap} onChange={setGap} min={0} max={48} />
          <div className="divider" />
          <h3>Items</h3>
          <LabeledNumber label="items" value={itemCount} onChange={setItemCount} min={1} max={12} />
          <LabeledNumber label="selected item" value={selectedIndex} onChange={setSelectedIndex} min={1} max={itemCount} />

          <LabeledNumber
            label="order"
            value={itemOverrides[selectedIndex]?.order ?? 0}
            onChange={(v) => setItemOverrides((prev) => ({ ...prev, [selectedIndex]: { ...prev[selectedIndex], order: v } }))}
            min={-10}
            max={10}
          />
          <LabeledNumber
            label="flex-grow"
            value={itemOverrides[selectedIndex]?.flexGrow ?? 0}
            onChange={(v) => setItemOverrides((prev) => ({ ...prev, [selectedIndex]: { ...prev[selectedIndex], flexGrow: v } }))}
            min={0}
            max={10}
          />
          <LabeledNumber
            label="flex-shrink"
            value={itemOverrides[selectedIndex]?.flexShrink ?? 1}
            onChange={(v) => setItemOverrides((prev) => ({ ...prev, [selectedIndex]: { ...prev[selectedIndex], flexShrink: v } }))}
            min={0}
            max={10}
          />
          <div className="control-row">
            <label>flex-basis</label>
            <input
              className="inline-input"
              placeholder="e.g. auto, 120px, 30%"
              value={itemOverrides[selectedIndex]?.flexBasis ?? "auto"}
              onChange={(e) => {
                const val = e.target.value;
                setItemOverrides((prev) => ({ ...prev, [selectedIndex]: { ...prev[selectedIndex], flexBasis: val } }));
              }}
            />
          </div>
          <LabeledSelect
            label="align-self"
            value={itemOverrides[selectedIndex]?.alignSelf ?? "auto"}
            onChange={(v) => setItemOverrides((prev) => ({ ...prev, [selectedIndex]: { ...prev[selectedIndex], alignSelf: v } }))}
            options={["auto", "stretch", "flex-start", "center", "flex-end", "baseline"]}
          />
        </aside>

        <div className="showcase" style={containerStyle}>
          {items.map((n) => (
            <div
              key={n}
              className="item"
              style={{
                minWidth: 40,
                ...(itemOverrides[n]?.order !== undefined ? { order: itemOverrides[n].order } : {}),
                ...(itemOverrides[n]?.flexGrow !== undefined ? { flexGrow: itemOverrides[n].flexGrow } : {}),
                ...(itemOverrides[n]?.flexShrink !== undefined ? { flexShrink: itemOverrides[n].flexShrink } : {}),
                ...(itemOverrides[n]?.flexBasis !== undefined ? { flexBasis: itemOverrides[n].flexBasis } : {}),
                ...(itemOverrides[n]?.alignSelf !== undefined ? { alignSelf: itemOverrides[n].alignSelf } : {}),
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


