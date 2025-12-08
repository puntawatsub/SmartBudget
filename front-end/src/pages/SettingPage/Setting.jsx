import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { useSetting } from "@/hooks/useSetting";

export default function SettingsPage() {
  const settings = useSetting();

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   // Implement save logic here, e.g., send settings to backend or update context
  //   console.log(settings);
  //   alert("Settings saved!");
  // };
  const handleSave = () => {
    console.log("Saving:", settings);
    alert("Settings saved!");
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between">
        <div className="text-2xl font-medium">Logo</div>

        <nav className="space-y-3 mt-6">
          <Button
            variant="ghost"
            className="w-full justify-start dark:text-white"
          >
            Home
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start dark:text-white"
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start dark:text-white"
          >
            Transactions
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start dark:text-white"
          >
            Goals
          </Button>
        </nav>

        <Button
          variant="outline"
          className="mt-auto w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          Logout
        </Button>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
          <div className="text-lg font-semibold dark:text-white">Settings</div>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search"
              className="w-64 bg-gray-100 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
            />
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-black dark:text-white">
              AA
            </div>
          </div>
        </header>

        {/* Tabs + content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Tabs defaultValue="personal">
            <TabsList className="dark:bg-gray-700">
              <TabsTrigger value="personal" className="dark:text-white">
                Personal Information
              </TabsTrigger>
              <TabsTrigger value="settings" className="dark:text-white">
                App Settings
              </TabsTrigger>
            </TabsList>

            {/* PERSONAL INFO */}
            <TabsContent value="personal">
              <section className="space-y-6 mt-6">
                <h2 className="text-lg font-bold dark:text-white">
                  Personal Information
                </h2>

                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded text-black dark:text-white">
                    Avatar
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-base dark:text-white">
                      Change profile picture
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="dark:bg-gray-700 dark:text-white"
                    >
                      Upload Avatar
                    </Button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <Label htmlFor="title" className="dark:text-white">
                    Name
                  </Label>
                  <Input
                    id="title"
                    placeholder="Your name"
                    value={settings.title}
                    onChange={(e) => settings.setTitle(e.target.value)}
                    className="bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="dark:text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={settings.email}
                    onChange={(e) => settings.setEmail(e.target.value)}
                    className="bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={settings.reset}
                    className="dark:bg-gray-700 dark:text-white"
                  >
                    Discard Changes
                  </Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </section>
            </TabsContent>

            {/* APP SETTINGS */}
            <TabsContent value="settings">
              <section className="space-y-6 mt-6">
                <h2 className="text-lg font-bold dark:text-white">
                  App Settings
                </h2>

                {/* THEME */}
                <div>
                  <Label htmlFor="theme" className="dark:text-white">
                    Theme
                  </Label>
                  <Select
                    value={settings.theme}
                    onValueChange={settings.setTheme}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-white">
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* LANGUAGE */}
                <div>
                  <Label htmlFor="language" className="dark:text-white">
                    Language
                  </Label>
                  <Select
                    value={settings.language}
                    onValueChange={settings.setLanguage}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-white">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fi">Finnish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* CURRENCY */}
                <div>
                  <Label htmlFor="currency" className="dark:text-white">
                    Currency
                  </Label>
                  <Select
                    value={settings.currency}
                    onValueChange={settings.setCurrency}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eur"> Euro</SelectItem>
                      <SelectItem value="usd"> USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* REGION */}
                <div>
                  <Label htmlFor="region" className="dark:text-white">
                    Region
                  </Label>
                  <Select
                    value={settings.region}
                    onValueChange={settings.setRegion}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600">
                      <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-white">
                      <SelectItem value="fi">Finland</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={settings.reset}
                    className="dark:bg-gray-700 dark:text-white"
                  >
                    Discard Changes
                  </Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
