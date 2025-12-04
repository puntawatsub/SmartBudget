import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import {useSetting} from "@/hooks/useSetting";
import { SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  const settings = useSetting();

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   // Implement save logic here, e.g., send settings to backend or update context
  //   console.log(settings);
  //   alert("Settings saved!");
  // };


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
        <div className="text-2xl font-medium">Logo</div>
        <nav className="space-y-3 mt-6">
          <Button variant="ghost" className="w-full justify-start">Home</Button>
          <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
          <Button variant="ghost" className="w-full justify-start">Transactions</Button>
          <Button variant="ghost" className="w-full justify-start">Goals</Button>
        </nav>
        <Button variant="outline" className="mt-auto w-full">Logout</Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="text-lg font-semibold">Settings</div>
          <div className="flex items-center gap-4">
            <Input placeholder="Search" className="w-64" />
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">AA</div>
          </div>
        </header>

        {/* Tabs + Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Tabs defaultValue="personal">
            <TabsList>
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="settings">App Settings</TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal">
              <section className="space-y-6 mt-6">
                <h2 className="text-lg font-bold">Personal Information</h2>

                {/* Avatar  need to work on this more*/}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
                    Avatar
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-base">Change profile picture</span>
                    <Button variant="secondary" size="sm">Upload Avatar</Button>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <Label htmlFor="title" >Name</Label>
                  <Input 
                    id="title" 
                    placeholder="Your name" 
                    value={settings.title} 
                    onChange={(e) => settings.setTitle(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    value={settings.email} 
                    onChange={(e) => settings.setEmail(e.target.value)}
                  />
                </div>

      

                {/* Button Actions */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={settings.reset}>Discard Changes</Button>
                  <Button onClick={settings.saveSettings}>Save</Button>
                </div>
              </section>
            </TabsContent>

            {/* App Settings */}
            <TabsContent value="settings">
              <section className="space-y-6 mt-6">
                <h2 className="text-lg font-bold">App Settings</h2>

                {/* Theme Settings */}
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select value={settings.theme} onValueChange={settings.setTheme}>
                    <SelectTrigger id="theme"><SelectValue placeholder="Select a theme" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={settings.setLanguage}>
                    <SelectTrigger id="language"><SelectValue placeholder="Select a language" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fi">Finnish</SelectItem>
                    </SelectContent>
                    
                  </Select>
                </div>

                {/* Currency */}
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={settings.currency} onValueChange={settings.setCurrency}>
                    <SelectTrigger id="currency"><SelectValue placeholder="Select a currency" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eur"> Euro</SelectItem>
                      <SelectItem value="usd"> USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Region */}
                <div>
                  <Label htmlFor="region">Region</Label>
                  <Select value={settings.region} onValueChange={settings.setRegion}>
                    <SelectTrigger id="region"><SelectValue placeholder="Select a region" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fi">Finland</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Button Actions */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={settings.reset}>Discard Changes</Button>
                  <Button onClick={settings.saveSettings}>Save</Button>
                </div>                
                </section>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
