"use client";

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
import { Fragment, useState } from "react";

interface Tecnologia {
  id: number;
  nombre: string;
}

interface Props {
  tecnologias: Tecnologia[];
  onChange: (ids: number[]) => void;
  defaultValues?: string[];
}

export function ComboboxTecnologias({ tecnologias, onChange, defaultValues }: Props) {
  const anchor = useComboboxAnchor();
  const nombres = tecnologias?.map((t) => t.nombre);
  const [techSeleccionada, setTechSeleccionada] = useState<boolean>(false);
  const [listaTecnologias, setListaTecnologias] = useState<string[]>(
    defaultValues ?? [],
  );
  const handleChange = (selectedNombres: string[]) => {
    setListaTecnologias(selectedNombres);
    setTechSeleccionada(selectedNombres.length > 0);
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
      value={listaTecnologias}
      onValueChange={handleChange}
    >
      <ComboboxChips
        ref={anchor}
        className="w-full mt-2 bg-transparent! outline-0!"
      >
        <ComboboxValue>
          {(values) => (
            <Fragment>
              {values.map((value: string) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput
                placeholder={!techSeleccionada ? "Tecnologías..." : ""}
              />
            </Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No se encontraron tecnologías.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem
              key={item}
              value={item}
              disabled={
                listaTecnologias.length >= 3 && !listaTecnologias.includes(item)
              }
            >
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
