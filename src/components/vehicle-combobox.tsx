"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { Vehicle } from "@/lib/types"

interface VehicleComboboxProps {
    vehicles: Vehicle[];
    value: string;
    onSelect: (model: string) => void;
}

export function VehicleCombobox({ vehicles, value, onSelect }: VehicleComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (currentValue: string) => {
    const selectedVehicle = vehicles.find(v => v.model.toLowerCase() === currentValue);
    const model = selectedVehicle ? selectedVehicle.model : "";
    onSelect(model);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? vehicles.find((vehicle) => vehicle.model === value)?.model
            : "Select vehicle..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search vehicle model..." />
          <CommandList>
            <CommandEmpty>No vehicle found.</CommandEmpty>
            <CommandGroup>
              {vehicles.map((vehicle) => (
                <CommandItem
                  key={vehicle.model}
                  value={vehicle.model}
                  onSelect={(currentValue) => {
                    handleSelect(currentValue)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === vehicle.model ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {vehicle.model}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
