import * as React from "react"
import { Check, PlusCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/atoms/badge"
import { Button } from "@/components/atoms/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/atoms/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/popover"
import { Separator } from "@/components/atoms/separator"
import type { Column } from "@tanstack/react-table"

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  selectedValues: string[]
  onValuesChange: (values: string[]) => void 
}

export function DataTableFacetedFilter <TData, TValue> ({
  // column,
  title,
  options,
  selectedValues: externalSelectedValues,
  onValuesChange
}: DataTableFacetedFilterProps<TData, TValue>) {

  // const facets = column?.getFacetedUniqueValues();

  const [internalSelectedValues, setInternalSelectedValues] = useState<Set<string>>(
    new Set(externalSelectedValues)
  )

  // Sincronizar con los valores externos cuando cambien
  useEffect(() => {
    setInternalSelectedValues(new Set(externalSelectedValues))
  }, [externalSelectedValues])

  // Actualizar valores externos cuando cambien los internos
  const updateExternalValues = (newValues: Set<string>) => {
    const valuesArray = Array.from(newValues)
    onValuesChange(valuesArray)
  }

  const handleSelect = (value: string) => {
    const newSelectedValues = new Set(internalSelectedValues)
    
    if (newSelectedValues.has(value)) {
      newSelectedValues.delete(value)
    } else {
      newSelectedValues.add(value)
    }

    setInternalSelectedValues(newSelectedValues)
    updateExternalValues(newSelectedValues)
  }

  const handleClear = () => {
    const newSelectedValues = new Set<string>()
    setInternalSelectedValues(newSelectedValues)
    updateExternalValues(newSelectedValues)
  }

  const selectedValuesSize = internalSelectedValues.size

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValuesSize > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValuesSize}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValuesSize > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValuesSize} seleccionadas
                  </Badge>
                ) : (
                  options
                    .filter((option) => internalSelectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Buscar ${title?.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No se encontraron resultados</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = internalSelectedValues.has(option.value)
                const IconComponent = option.icon
                
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    {IconComponent && (
                      <IconComponent className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                    {/* {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )} */}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValuesSize > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClear}
                    className="justify-center text-center"
                  >
                    Limpiar filtros
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}