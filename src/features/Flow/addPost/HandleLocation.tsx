import React from "react";

import Pin from "src/svg/pin-alt.svg";

interface Props {
  country: string | null;
  county: string | null;
  city: string | null;
}

export default function HandleLocation({ country, county, city }: Props) {
  return (
    <p className="meta mt5">
      <Pin width={18} height={18} className="metaIcon" />
      {city ? `${city}, ` : null}
      {county ? `${county}, ` : null}
      {country}
    </p>
  );
}
