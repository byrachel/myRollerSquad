import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SingleBusinessPlace from "src/features/BusinessProfile/SingleBusinessPlace";

export default function Post() {
  const [place, setPlace] = useState(null);
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    if (pid) {
      axios
        .get(`/api/business/place/${pid}`)
        .then((res) => setPlace(res.data.place))
        .catch(() => setPlace(null));
    }
  }, [pid]);

  return place ? <SingleBusinessPlace place={place} /> : null;
}
