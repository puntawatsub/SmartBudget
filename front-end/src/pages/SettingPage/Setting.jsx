import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '@/components/ui/select'
import { useSetting } from '@/hooks/useSetting'
import Sidebar from '@/components/Sidebar'

export default function SettingsPage() {
  const settings = useSetting()
  const handleSave = () => {
    console.log('Saving:', settings)
    alert('Settings saved!')
  }

  return (
    <div className='flex h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white'>
      {/* Main */}
      <main className='flex-1 flex flex-col'>
        {/* Tabs + content */}
        <div className='flex-1 p-8 overflow-y-auto'>
          <Tabs defaultValue='personal'>
            <TabsList className='dark:bg-gray-700'>
              <TabsTrigger value='personal' className='dark:text-white'>
                Personal Information
              </TabsTrigger>
              <TabsTrigger value='settings' className='dark:text-white'>
                App Settings
              </TabsTrigger>
            </TabsList>

            {/* PERSONAL INFO */}
            <TabsContent value='personal'>
              <section className='space-y-6 mt-6'>
                <h2 className='text-lg font-bold dark:text-white'>
                  Personal Information
                </h2>

                {/* Name */}
                <div>
                  <Label htmlFor='title' className='dark:text-white'>
                    Name
                  </Label>
                  <Input
                    id='title'
                    placeholder='Your name'
                    value={settings.title}
                    onChange={(e) => settings.setTitle(e.target.value)}
                    className='bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600'
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor='email' className='dark:text-white'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='you@example.com'
                    value={settings.email}
                    onChange={(e) => settings.setEmail(e.target.value)}
                    className='bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600'
                  />
                </div>

                {/* Actions */}
                <div className='flex gap-2 pt-4'>
                  <Button
                    variant='outline'
                    onClick={settings.reset}
                    className='dark:bg-gray-700 dark:text-white'>
                    Discard Changes
                  </Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </section>
            </TabsContent>

            {/* APP SETTINGS */}
            {/* APP SETTINGS */}
            <TabsContent value='settings'>
              <section className='space-y-6 mt-6'>
                <h2 className='text-lg font-bold dark:text-white'>
                  App Settings
                </h2>

                {/* THEME - Editable */}
                <div>
                  <Label htmlFor='theme' className='dark:text-white'>
                    Theme
                  </Label>
                  <Select
                    value={settings.theme}
                    onValueChange={settings.setTheme}>
                    <SelectTrigger className='bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600'>
                      <SelectValue placeholder='Select a theme' />
                    </SelectTrigger>
                    <SelectContent className='dark:bg-gray-700 dark:text-white'>
                      <SelectItem value='light'>Light</SelectItem>
                      <SelectItem value='dark'>Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* REGION - Editable */}
                <div>
                  <Label htmlFor='region' className='dark:text-white'>
                    Region
                  </Label>
                  <Select
                    value={settings.region}
                    onValueChange={settings.setRegion}>
                    <SelectTrigger className='bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600'>
                      <SelectValue placeholder='Select a region' />
                    </SelectTrigger>
                    <SelectContent className='dark:bg-gray-700 dark:text-white'>
                      <SelectItem value='fi'>Finland</SelectItem>
                      <SelectItem value='usa'>USA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* LANGUAGE - Locked to English */}
                <div>
                  <Label htmlFor='language' className='dark:text-white'>
                    Language
                  </Label>
                  <Input
                    id='language'
                    value='English'
                    disabled
                    className='bg-gray-100 dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                  />
                </div>

                {/* CURRENCY - Locked to Euro */}
                <div>
                  <Label htmlFor='currency' className='dark:text-white'>
                    Currency
                  </Label>
                  <Input
                    id='currency'
                    value='EUR (€)'
                    disabled
                    className='bg-gray-100 dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                  />
                </div>

                {/* Actions */}
                <div className='flex gap-2 pt-4'>
                  <Button
                    variant='outline'
                    onClick={settings.reset}
                    className='dark:bg-gray-700 dark:text-white'>
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
  )
}
