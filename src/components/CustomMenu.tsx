import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";

interface Props {
  selectedItem: string;
  onChange: (platform: string) => void;
  items: string[];
}

const CustomMenu = ({ selectedItem, onChange, items }: Props) => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {selectedItem ? "Platform: " + selectedItem : "Platforms"}
      </MenuButton>
      <MenuList>
        {selectedItem && (
          <MenuItem color={"tomato"} onClick={() => onChange("")}>
            Clear
          </MenuItem>
        )}
        {items.map((item) => (
          <MenuItem
            key={item}
            color={colorMode == "dark" ? "white" : "black"}
            onClick={() => onChange(item)}
          >
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CustomMenu;
