import { ListBox, Select } from "@heroui/react";

type Option = {
  key: string;
  label: string;
};

type DropdownProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

// Opsi dengan key kosong ("All ...") memakai id "all" karena id kosong tidak aman di ListBox
const ALL = "all";

const Dropdown = ({
  label,
  value,
  options,
  onChange,
}: DropdownProps) => {
  return (
    <Select
      aria-label={label}
      value={value || ALL}
      onChange={(key) => onChange(key === ALL ? "" : String(key ?? ""))}
      className="w-44"
    >
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item
              key={option.key || ALL}
              id={option.key || ALL}
              textValue={option.label}
            >
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default Dropdown;