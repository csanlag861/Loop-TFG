"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

interface Tecnologia {
  id: number;
  nombre: string;
}

interface Props {
  tecnologias: Tecnologia[];
  onChange: (ids: number[]) => void;
}

export function ComboboxTecnologias({ tecnologias, onChange }: Props) {
  const anchor = useComboboxAnchor();
  const nombres = tecnologias.map((t) => t.nombre);

  const handleChange = (selectedNombres: string[]) => {
    const ids = tecnologias
      .filter((t) => selectedNombres.includes(t.nombre))
      .map((t) => t.id);
    onChange(ids);
  };

  return (
    <Combobox
      multiple
      autoHighlight
      items={nombres}
      onValueChange={handleChange}
    >
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values) => (
            <React.Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Tecnologías..." />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No se encontraron tecnologías.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
