import {
  addTableFieldsAtom,
  viewDetailAtom,
} from "@/libs/atoms/calculate/view";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function useAddField() {
  const [tData, setTData] = useRecoilState(viewDetailAtom);
  const { settlementTotal } = tData ?? {};
  const [addFields, setAddFields] = useRecoilState(addTableFieldsAtom);

  useEffect(() => {
    /// a1
    if (!!settlementTotal?.a1extra1name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("a1extra1")) return prevFields;
        return [...prevFields, "a1extra1"];
      });
    }

    if (!!settlementTotal?.a1extra2name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("a1extra2")) return prevFields;
        return [...prevFields, "a1extra2"];
      });
    }

    if (!!settlementTotal?.a1extra3name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("a1extra3")) return prevFields;
        return [...prevFields, "a1extra3"];
      });
    }

    if (!!settlementTotal?.a1extra4name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("a1extra4")) return prevFields;
        return [...prevFields, "a1extra4"];
      });
    }

    if (!!settlementTotal?.a1extra5name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("a1extra5")) return prevFields;
        return [...prevFields, "a1extra5"];
      });
    }

    /// b1
    if (!!settlementTotal?.b1extra1name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b1extra1")) return prevFields;
        return [...prevFields, "b1extra1"];
      });
    }

    if (!!settlementTotal?.b1extra2name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b1extra2")) return prevFields;
        return [...prevFields, "b1extra2"];
      });
    }

    if (!!settlementTotal?.b1extra3name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b1extra3")) return prevFields;
        return [...prevFields, "b1extra3"];
      });
    }

    if (!!settlementTotal?.b1extra4name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b1extra4")) return prevFields;
        return [...prevFields, "b1extra4"];
      });
    }

    if (!!settlementTotal?.b1extra5name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b1extra5")) return prevFields;
        return [...prevFields, "b1extra5"];
      });
    }

    /// b3
    if (!!settlementTotal?.b3extra1name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b3extra1")) return prevFields;
        return [...prevFields, "b3extra1"];
      });
    }

    if (!!settlementTotal?.b3extra2name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b3extra2")) return prevFields;
        return [...prevFields, "b3extra2"];
      });
    }

    if (!!settlementTotal?.b3extra3name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b3extra3")) return prevFields;
        return [...prevFields, "b3extra3"];
      });
    }

    if (!!settlementTotal?.b3extra4name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b3extra4")) return prevFields;
        return [...prevFields, "b3extra4"];
      });
    }

    if (!!settlementTotal?.b3extra5name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b3extra5")) return prevFields;
        return [...prevFields, "b3extra5"];
      });
    }

    /// b4
    if (!!settlementTotal?.b4extra1name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b4extra1")) return prevFields;
        return [...prevFields, "b4extra1"];
      });
    }

    if (!!settlementTotal?.b4extra2name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b4extra2")) return prevFields;
        return [...prevFields, "b4extra2"];
      });
    }

    if (!!settlementTotal?.b4extra3name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b4extra3")) return prevFields;
        return [...prevFields, "b4extra3"];
      });
    }

    if (!!settlementTotal?.b4extra4name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b4extra4")) return prevFields;
        return [...prevFields, "b4extra4"];
      });
    }

    if (!!settlementTotal?.b4extra5name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("b4extra5")) return prevFields;
        return [...prevFields, "b4extra5"];
      });
    }

    /// c1
    if (!!settlementTotal?.c1extra1name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("c1extra1")) return prevFields;
        return [...prevFields, "c1extra1"];
      });
    }

    if (!!settlementTotal?.c1extra2name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("c1extra2")) return prevFields;
        return [...prevFields, "c1extra2"];
      });
    }

    if (!!settlementTotal?.c1extra3name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("c1extra3")) return prevFields;
        return [...prevFields, "c1extra3"];
      });
    }

    if (!!settlementTotal?.c1extra4name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("c1extra4")) return prevFields;
        return [...prevFields, "c1extra4"];
      });
    }

    if (!!settlementTotal?.c1extra5name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("c1extra5")) return prevFields;
        return [...prevFields, "c1extra5"];
      });
    }

    /// c2
    if (!!settlementTotal?.c2extra1name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("c2extra1")) return prevFields;
        return [...prevFields, "c2extra1"];
      });
    }

    if (!!settlementTotal?.c2extra2name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("c2extra2")) return prevFields;
        return [...prevFields, "c2extra2"];
      });
    }

    if (!!settlementTotal?.c2extra3name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("c2extra3")) return prevFields;
        return [...prevFields, "c2extra3"];
      });
    }

    if (!!settlementTotal?.c2extra4name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("c2extra4")) return prevFields;
        return [...prevFields, "c2extra4"];
      });
    }

    if (!!settlementTotal?.c2extra5name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("c2extra5")) return prevFields;
        return [...prevFields, "c2extra5"];
      });
    }

    /// d1
    if (!!settlementTotal?.d1extra1name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d1extra1")) return prevFields;
        return [...prevFields, "d1extra1"];
      });
    }

    if (!!settlementTotal?.d1extra2name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d1extra2")) return prevFields;
        return [...prevFields, "d1extra2"];
      });
    }

    if (!!settlementTotal?.d1extra3name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d1extra3")) return prevFields;
        return [...prevFields, "d1extra3"];
      });
    }

    if (!!settlementTotal?.d1extra4name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d1extra4")) return prevFields;
        return [...prevFields, "d1extra4"];
      });
    }

    if (!!settlementTotal?.d1extra5name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d1extra5")) return prevFields;
        return [...prevFields, "d1extra5"];
      });
    }

    /// d2
    if (!!settlementTotal?.d2extra1name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d2extra1")) return prevFields;
        return [...prevFields, "d2extra1"];
      });
    }

    if (!!settlementTotal?.d2extra2name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d2extra2")) return prevFields;
        return [...prevFields, "d2extra2"];
      });
    }

    if (!!settlementTotal?.d2extra3name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d2extra3")) return prevFields;
        return [...prevFields, "d2extra3"];
      });
    }

    if (!!settlementTotal?.d2extra4name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d2extra4")) return prevFields;
        return [...prevFields, "d2extra4"];
      });
    }

    if (!!settlementTotal?.d2extra5name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d2extra5")) return prevFields;
        return [...prevFields, "d2extra5"];
      });
    }

    /// d3
    if (!!settlementTotal?.d3extra1name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d3extra1")) return prevFields;
        return [...prevFields, "d3extra1"];
      });
    }

    if (!!settlementTotal?.d3extra2name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d3extra2")) return prevFields;
        return [...prevFields, "d3extra2"];
      });
    }

    if (!!settlementTotal?.d3extra3name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d3extra3")) return prevFields;
        return [...prevFields, "d3extra3"];
      });
    }

    if (!!settlementTotal?.d3extra4name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d3extra4")) return prevFields;
        return [...prevFields, "d3extra4"];
      });
    }

    if (!!settlementTotal?.d3extra5name) {
      setAddFields((prevFields) => {
        if (prevFields.includes("d3extra5")) return prevFields;
        return [...prevFields, "d3extra5"];
      });
    }
  }, [settlementTotal]);
}
