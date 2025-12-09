import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
const AddCategoryPopover = ({
  setCategories,
  onNewCategoryAdded = null,
  ...children
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCategory = () => {
    setCategories((prevCategories) => [...prevCategories, categoryName]);
    onNewCategoryAdded && onNewCategoryAdded(categoryName);
    setCategoryName("");
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" {...children}>
          Add
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Category Name</h4>
            <p className="text-muted-foreground text-sm">
              Add a new category to categorize your transactions
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="categoryName">Name</Label>
              <Input
                id="categoryName"
                placeholder="e.g. Grocery"
                className="col-span-2 h-8"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={() => handleAddCategory()}>
              Add Category
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddCategoryPopover;
