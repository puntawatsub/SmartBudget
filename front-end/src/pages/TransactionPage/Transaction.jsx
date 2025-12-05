import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Calendar } from "@/components/ui/calendar";

import {
  ChartPie,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Sparkles,
} from "lucide-react";

import { Pie, PieChart } from "recharts";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { List } from "lucide-react";
import { useEffect } from "react";
import { is } from "date-fns/locale/is";

//mock data for now
// const transactions = [
//   {
//     date: "31 Dec 2020",
//     merchant: "Bulk",
//     category: "Grocery",
//     amount: "-€23.00",
//   },
//   {
//     date: "30 Dec 2020",
//     merchant: "Happiness Market Center",
//     category: "Grocery",
//     amount: "-€45.00",
//   },
//   {
//     date: "17 Dec 2020",
//     merchant: "income",
//     category: "income",
//     amount: "+€3,000.00",
//   },
//   {
//     date: "11 Dec 2020",
//     merchant: "Lattes",
//     category: "Coffee",
//     amount: "-€12.00",
//   },
//   {
//     date: "10 Dec 2020",
//     merchant: "Child Welfare",
//     category: "Charity",
//     amount: "-€100.00",
//   },
//   {
//     date: "09 Dec 2020",
//     merchant: "Electricity Bill",
//     category: "Utility",
//     amount: "-€120.00",
//   },
//   {
//     date: "08 Dec 2020",
//     merchant: "FDD Electricals",
//     category: "Health",
//     amount: "-€80.00",
//   },
//   {
//     date: "04 Dec 2020",
//     merchant: "Freelancing Project",
//     category: "income",
//     amount: "+€1,200.00",
//   },
// ];

const hardCodedTransactions = [
  {
    date: "31 Dec 2020",
    merchant: "Bulk",
    category: "Grocery",
    amount: "-€23.00",
  },
  {
    date: "30 Dec 2020",
    merchant: "Happiness Market Center",
    category: "Grocery",
    amount: "-€45.00",
  },
];

const chartData = [
  { category: "cat1", percentage: 25, fill: "#274754" },
  { category: "cat2", percentage: 25, fill: "#2A9D90" },
  { category: "cat3", percentage: 20, fill: "#E76E50" },
  { category: "cat4", percentage: 30, fill: "#E8C468" },
];

function Transaction() {
  const [date, setDate] = useState();
  const [transactionListOffset, setTransactionListOffset] = useState(0);
  const [wasteSpendingListOffset, setWasteSpendingListOffset] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionsError, setTransactionsError] = useState(null);
  const [newTransactionName, setNewTransactionName] = useState("");
  const [newTransactionAmount, setNewTransactionAmount] = useState("");
  const [newTransactionCategory, setNewTransactionCategory] = useState("");
  const [newTransactionDate, setNewTransactionDate] = useState(new Date());
  const [isAddTransactionDialogOpen, setIsAddTransactionDialogOpen] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTransactionsLoading(true);
        const token = sessionStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await fetch("/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(
            `Response Status ${response.status}: ${response.statusText}`
          );
        }
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setTransactionsError(err.message);
      } finally {
        setTransactionsLoading(false);
      }
    };
    fetchData();
  }, []);

  const addTransaction = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("User not authenticated");
      return;
    }
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: newTransactionDate,
          merchant: newTransactionName,
          category: {
            categoryName: newTransactionCategory,
            categoryColor: "blue", // hardcoded for now
          },
          amount: newTransactionAmount,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }
      const data = await response.json();
      setTransactions((prev) => [...prev, data]);
      setIsAddTransactionDialogOpen(false);
    } catch (err) {
      alert(`Error adding transaction: ${err.message}`);
    }
  };

  return (
    <div className="p-6 flex gap-6 flex-col">
      {/* Header Card */}

      {/* Filters */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        {/* Add Transaction Dialog */}
        <div className="flex gap-4">
          <Dialog
            open={isAddTransactionDialogOpen}
            onOpenChange={setIsAddTransactionDialogOpen}
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
                  value={newTransactionAmount}
                  onChange={(e) => setNewTransactionAmount(e.target.value)}
                  required
                  placeholder="Amount"
                />
                <div className="flex flex-row">
                  <Select
                    value={newTransactionCategory}
                    onValueChange={(value) => setNewTransactionCategory(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent required onChange={(e) => console.log(e)}>
                      <SelectItem value="grocery">Grocery</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="outline" className="ml-2">
                    Manage
                  </Button>
                </div>

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
          <Button variant="outline">
            Download CSV
            <Download />
          </Button>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="rounded-xl overflow-hidden border border-gray-200">
        <Table>
          <TableHeader className="bg-[#f4f4f4]">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions
              .slice(0 + transactionListOffset, 5 + transactionListOffset)
              .map((tx, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(tx.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{tx.merchant}</TableCell>
                  <TableCell>
                    <Badge>{tx.category.categoryName}</Badge>
                  </TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">⋮</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center border-t border-gray-300">
          <div className="p-5 text-gray-600">
            {transactions.length <= 0 ? (
              <>{"No data"}</>
            ) : (
              <>
                Showing{" "}
                <span className="font-bold">
                  {1 + transactionListOffset}-
                  {transactions.slice(
                    0 + transactionListOffset,
                    5 + transactionListOffset
                  ).length + transactionListOffset}
                </span>{" "}
                of <span className="font-bold">{transactions.length}</span> data
              </>
            )}
          </div>
          <ReactPaginate
            pageCount={Math.ceil(transactions.length / 5)}
            onPageChange={(e) => {
              console.log(e.selected * 5);
              setTransactionListOffset(e.selected * 5);
            }}
            forcePage={0}
            previousLabel={<ChevronLeft className="inline-block" />}
            nextLabel={<ChevronRight className="inline-block" />}
            breakLabel="…"
            pageRangeDisplayed={5}
            containerClassName="flex items-center rounded-sm m-5 overflow-hidden shadow-xs"
            previousClassName="p-2 rounded-l-sm hover:bg-gray-100 border-y border-l border-gray-300"
            nextClassName="p-2 rounded-r-sm border border-gray-300 hover:bg-gray-100"
            pageClassName="p-2 px-4 border-y border-l font-medium"
            pageLinkClassName=""
            activeClassName="bg-blue-600 text-white border-blue-600"
            activeLinkClassName=""
            disabledClassName="opacity-50 pointer-events-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-medium">Transaction Overview</span>
        <div className="rounded-xl border border-gray-300 shadow-xs overflow-hidden">
          <div className="text-gray-500 p-3 flex gap-3 items-center text-sm font-medium border-b border-gray-300">
            <ChartPie size={16} />
            Spending Analysis
          </div>
          <div className="flex sm:flex-row flex-col w-full overflow-hidden">
            <div className="h-40 flex-1 relative border-b sm:border-r p-7 border-gray-100 flex flex-col justify-center items-center overflow-hidden">
              <div className="w-[64%] h-72 left-0 top-[100px] absolute bg-[conic-gradient(from_12deg_at_50.00%_50.00%,rgba(72.16,255,84.35,0.25)_0deg,rgba(202.75,255,235.84,0.25)_360deg)] rounded-full blur-2xl" />
              <div className="flex py-1.5 flex-row w-full items-center justify-between">
                <span className="text-gray-500 text-sm font-medium">
                  Total Spendings
                </span>
                <span className="text-red-500 text-sm font-medium">+15%</span>
              </div>
              <div className="text-black text-3xl font-medium self-start">
                €3000
              </div>
            </div>
            <div className="h-40 flex-1 relative border-b sm:border-r p-7 border-gray-100 flex flex-col justify-center items-center overflow-hidden">
              <div className="w-[64%] h-72 left-0 top-[100px] absolute bg-[conic-gradient(from_12deg_at_50.00%_50.00%,rgba(72.16,215.38,255,0.25)_0deg,rgba(202.75,255,235.84,0.25)_360deg)] rounded-full blur-2xl" />
              <div className="flex py-1.5 flex-row w-full items-center justify-between">
                <span className="text-gray-500 text-sm font-medium">
                  Duplicates
                </span>
                <span className="text-gray-500 text-sm font-medium">
                  -10,24%
                </span>
              </div>
              <div className="text-black text-3xl font-medium self-start">
                20%
              </div>
            </div>
            <div className="h-40 flex-1 relative border-b sm:border-r p-7 border-gray-100 flex flex-col justify-center items-center overflow-hidden">
              <div className="w-[64%] h-72 left-0 top-[100px] absolute bg-[conic-gradient(from_12deg_at_50.00%_50.00%,rgba(255,166.63,72.16,0.25)_0deg,rgba(251,181.70,152,0.25)_360deg)] rounded-full blur-2xl" />
              <div className="flex py-1.5 flex-row w-full items-center justify-between">
                <span className="text-gray-500 text-sm font-medium">
                  Inefficients
                </span>
                <span className="text-red-500 text-sm font-medium">-5%</span>
              </div>
              <div className="text-black text-3xl font-medium self-start">
                15%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-medium">Suggestions</span>
        <div className="rounded-xl border border-gray-300 shadow-xs overflow-hidden">
          <div className="text-gray-500 p-3 flex gap-3 items-center text-sm font-medium border-b border-gray-300">
            <Sparkles size={16} />
            AI Generated
          </div>
          <div className="flex flex-row w-full overflow-hidden">
            <div className="flex-1 relative border-r p-7 border-gray-100 flex flex-col justify-center items-center overflow-hidden">
              <div className="w-[127%] h-[400px] left-0 top-[43px] absolute bg-[conic-gradient(from_334deg_at_50.00%_50.00%,rgba(120.92,72.16,255,0.15)_48deg,rgba(243.68,202.75,255,0.15)_360deg)] rounded-full blur-2xl" />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
              doloremque cum at, cupiditate, eligendi quidem ab eveniet tempora
              autem voluptates, eaque quasi ratione itaque maxime asperiores quo
              consectetur aliquid? Aut? Exercitationem impedit assumenda illum
              officiis nostrum accusantium facere eligendi, iusto possimus
              soluta quibusdam aspernatur sint tempore rerum laborum atque sunt
              quos dolores. Laborum recusandae cumque, pariatur dolorum debitis
              dignissimos nesciunt.
            </div>
          </div>
        </div>
      </div>
      {/* Spending Analysis Chart & Table */}
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="flex flex-col flex-1 gap-3">
          <div className="rounded-xl border border-gray-300 shadow-xs overflow-hidden">
            <div className="text-gray-500 p-3 flex gap-3 items-center text-sm font-medium border-b border-gray-300">
              <ChartPie size={16} />
              Spending Analysis
            </div>
            <div className="flex flex-row w-full overflow-hidden">
              <div className="flex-1 relative p-7 border-gray-100 flex flex-col justify-center items-center overflow-hidden">
                <h1 className="font-semibold">Spending Analysis</h1>
                <h2 className="text-sm text-[#60646C] pt-[0.313rem]">
                  01 - 28 November 2025
                </h2>
                <PieChart
                  style={{
                    width: "100%",
                    aspectRatio: 1,
                  }}
                  responsive
                  className="pointer-events-none select-none touch-none"
                >
                  <Pie
                    data={chartData}
                    dataKey="percentage"
                    labelLine={false}
                    // isAnimationActive={false}
                    label={({ payload, ...props }) => {
                      return (
                        <text
                          cx={props.cx}
                          cy={props.cy}
                          x={props.x}
                          y={props.y}
                          textAnchor={props.textAnchor}
                          dominantBaseline={props.dominantBaseline}
                          fill="#000000"
                        >
                          {payload.category}: {payload.percentage}%
                        </text>
                      );
                    }}
                    nameKey="category"
                  />
                </PieChart>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-2 gap-4">
          <div className="flex w-full flex-col gap-3">
            <div className="rounded-xl border w-full border-gray-300 shadow-xs overflow-hidden">
              <div className="text-gray-500 p-3 flex gap-3 items-center text-sm font-medium border-b border-gray-300">
                <List size={16} />
                Wasteful Spendings
              </div>
              <div className="flex flex-row w-full overflow-hidden">
                <div className="overflow-hidden w-full">
                  <Table>
                    <TableHeader className="bg-[#f4f4f4] hidden">
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Merchant</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hardCodedTransactions
                        .slice(
                          0 + wasteSpendingListOffset,
                          5 + wasteSpendingListOffset
                        )
                        .map((tx, index) => (
                          <TableRow key={index}>
                            <TableCell>{tx.date}</TableCell>
                            <TableCell>{tx.merchant}</TableCell>
                            <TableCell>
                              <Badge>{tx.category}</Badge>
                            </TableCell>
                            <TableCell>{tx.amount}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-between items-center border-t border-gray-300">
                    <div className="p-5 text-gray-600">
                      Showing{" "}
                      <span className="font-bold">
                        {1 + wasteSpendingListOffset}-
                        {transactions.slice(
                          0 + wasteSpendingListOffset,
                          5 + wasteSpendingListOffset
                        ).length + wasteSpendingListOffset}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold">{transactions.length}</span>{" "}
                      data
                    </div>
                    <ReactPaginate
                      pageCount={Math.ceil(transactions.length / 5)}
                      onPageChange={(e) => {
                        console.log(e.selected * 5);
                        setWasteSpendingListOffset(e.selected * 5);
                      }}
                      forcePage={0}
                      previousLabel={<ChevronLeft className="inline-block" />}
                      nextLabel={<ChevronRight className="inline-block" />}
                      breakLabel="…"
                      pageRangeDisplayed={5}
                      containerClassName="flex items-center rounded-sm m-5 overflow-hidden shadow-xs"
                      previousClassName="p-2 rounded-l-sm hover:bg-gray-100 border-y border-l border-gray-300"
                      nextClassName="p-2 rounded-r-sm border border-gray-300 hover:bg-gray-100"
                      pageClassName="p-2 px-4 border-y border-l font-medium"
                      pageLinkClassName=""
                      activeClassName="bg-blue-600 text-white border-blue-600"
                      activeLinkClassName=""
                      disabledClassName="opacity-50 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
