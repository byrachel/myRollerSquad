import { getCategoryName } from "src/constants/PostCategories";
import { getStyleName } from "src/constants/RollerSkateStyles";
import { FlowInterface } from "src/reducers/FlowReducer";
import { cardColor } from "src/utils/colorManager";
import React from "react";

interface Props {
  flowStore: FlowInterface;
  flowDispatch: React.Dispatch<any>;
}

export default function FlowFilters({ flowStore, flowDispatch }: Props) {
  return (
    <div className="flowFilters">
      <p className="meta">Filtres : </p>
      {flowStore.category || flowStore.style ? (
        <>
          {flowStore.category ? (
            <div
              role="button"
              key={flowStore.category}
              tabIndex={0}
              className={`badge ${cardColor(flowStore.category)}`}
              onClick={() =>
                flowDispatch({
                  type: "SET_CATEGORY",
                  payload: null,
                })
              }
              onKeyDown={() =>
                flowDispatch({
                  type: "SET_CATEGORY",
                  payload: null,
                })
              }
            >
              {getCategoryName(flowStore.category)}
              <span style={{ marginLeft: 12 }}>x</span>
            </div>
          ) : null}
          {flowStore.style ? (
            <div
              role="button"
              key={flowStore.style}
              tabIndex={0}
              className={`outlineBadge ${
                flowStore.category
                  ? cardColor(flowStore.category)
                  : cardColor(flowStore.style)
              }`}
              onClick={() =>
                flowDispatch({
                  type: "SET_STYLE",
                  payload: null,
                })
              }
              onKeyDown={() =>
                flowDispatch({
                  type: "SET_STYLE",
                  payload: null,
                })
              }
            >
              {getStyleName(flowStore.style)}
              <span style={{ marginLeft: 12 }}>x</span>
            </div>
          ) : null}
        </>
      ) : (
        <p className="meta">aucun</p>
      )}
    </div>
  );
}
