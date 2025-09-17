import * as React from "react"
import { Check, PlusCircle } from "lucide-react"

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

interface DataTableBooleanFilterProps {
  title?: string
  options: {
    label: string
    value: boolean
    icon?: React.ComponentType<{ className?: string }>
  }[]
  selectedValue?: boolean
  onValueChange: (value?: boolean) => void // Cambiado para aceptar undefined
}

export function TableBooleanFilter({
  title,
  options,
  selectedValue,
  onValueChange
}: DataTableBooleanFilterProps) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValue !== undefined && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {options.find(opt => opt.value === selectedValue)?.label}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No hay resultados</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValue === option.value
                const IconComponent = option.icon
                return (
                  <CommandItem
                    key={String(option.value)}
                    onSelect={() => {
                      if (isSelected) {
                        onValueChange(undefined) // Limpiar filtro
                      } else {
                        onValueChange(option.value) // Establecer nuevo valor
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    {IconComponent && (
                      <IconComponent className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedValue !== undefined && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onValueChange(undefined)}
                    className="justify-center text-center"
                  >
                    Limpiar filtro
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