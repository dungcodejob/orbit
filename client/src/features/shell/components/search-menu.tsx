import {
    Calculator,
    Calendar,
    CreditCard,
    Search,
    Settings,
    Smile,
    User,
} from 'lucide-react';

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { RiSparklingLine } from '@remixicon/react';
import { useMemo } from 'react';


export function SearchMenu() {

    const smartPromptExamples = useMemo(
        () => [
          'Doanh thu hôm nay là bao nhiêu?',
          'So sánh doanh thu tháng này và tháng trước',
          'Mặt hàng nào đang sắp hết hàng?',
          'Báo cáo doanh thu hàng ngày trong tuần này',
          'Dự đoán doanh thu cho tuần tới dựa trên dữ liệu hiện tại',
        ],
        [],
      );

    return (
       <>
                       <Button variant="ghost" size="icon">
                    <Search />
                </Button>
                <CommandDialog open={true}>
                    <CommandInput placeholder="Type a command or search..." />

                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Searching for">
                            <div className='flex gap-2 mt-1.5'>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="outline">Outline</Badge>
                            </div>
                        </CommandGroup>
                        <CommandGroup heading="Suggestions" className='mb-3'>
                            {smartPromptExamples.map((example) => (
                                <CommandItem key={example}>
                                    <RiSparklingLine />
                                    <span>{example}</span>
                                </CommandItem>
                            ))}

                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem>
                                <User />
                                <span>Profile</span>
                                <CommandShortcut>⌘P</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <CreditCard />
                                <span>Billing</span>
                                <CommandShortcut>⌘B</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <Settings />
                                <span>Settings</span>
                                <CommandShortcut>⌘S</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </CommandDialog>
       </>
    );
}
