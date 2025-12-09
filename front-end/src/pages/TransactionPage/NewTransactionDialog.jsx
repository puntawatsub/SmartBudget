import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import AddCategoryPopover from "./AddCategoryPopover";
import { useState } from "react";
import { useEffect } from "react";

const NewTransactionDialog = ({
  isAddTransactionDialogOpen,
  setIsAddTransactionDialogOpen,
  newTransactionName,
  setNewTransactionName,
  newTransactionAmount,
  setNewTransactionAmount,
  newTransactionCategory,
  setNewTransactionCategory,
  newTransactionDate,
  setNewTransactionDate,
  addTransaction,
}) => {
  const [amount, setAmount] = useState("");

  const clearAllFields = () => {
    setNewTransactionName("");
    setAmount("");
    setNewTransactionCategory("");
    setNewTransactionDate(new Date());
  };

  const [transactionCategories, setTransactionCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactionType, setTransactionType] = useState("expense");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/categories/unique", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setTransactionCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and two decimal points and no negative sign
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
      setNewTransactionAmount(
        transactionType === "expense"
          ? -Math.abs(parseFloat(value) || 0)
          : Math.abs(parseFloat(value) || 0)
      );
    }
  };

  return (
    <Dialog
      open={isAddTransactionDialogOpen}
      onOpenChange={(e) => {
        clearAllFields();
        setIsAddTransactionDialogOpen(e);
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-800 border border-green-800">
          <Plus />
          Add Transaction
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Fill in the details below</DialogDescription>
        </DialogHeader>
        <form className="flex gap-y-3 flex-col" onSubmit={addTransaction}>
          <Input
            value={newTransactionName}
            onChange={(e) => setNewTransactionName(e.target.value)}
            required
            placeholder="Transaction Name"
          />
          <Input
            value={amount}
            onChange={(e) => handleAmountChange(e)}
            required
            placeholder="Amount"
          />
          <div className="flex flex-row">
            <Select
              value={newTransactionCategory}
              onValueChange={(value) => {
                setNewTransactionCategory(value);
                console.log(value);
              }}
              required
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent required>
                {transactionCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <AddCategoryPopover
              className="ml-2"
              setCategories={setTransactionCategories}
            />
          </div>
          <div className="flex flex-row">
            <Select
              value={transactionType}
              onValueChange={(value) => {
                setTransactionType(value);
              }}
              required
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent required>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}

          <Calendar
            mode="single"
            selected={newTransactionDate}
            onSelect={setNewTransactionDate}
            captionLayout="dropdown"
            showOutsideDays
            className="rounded-lg border"
          />

          <DialogFooter>
            <Button type="submit">Add</Button>
            <Button
              type="button"
              onClick={() => setIsAddTransactionDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTransactionDialog;
