import React from "react";
import CategoryFilter from "../CategoryFilter";
import StyleFilter from "../StyleFilter";

interface Props {
  flowDispatch: React.Dispatch<any>;
}

export default function FlowFilters({ flowDispatch }: Props) {
  return (
    <div className="flowFilters">
      <p className="meta">Filtres:</p>
      <CategoryFilter flowDispatch={flowDispatch} />
      <StyleFilter flowDispatch={flowDispatch} />
    </div>
  );
}
