import {describe,expect,test,before, beforeAll, beforeEach} from '@jest/globals';
import {render,screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import Tabs from "../Tab/Tabs";
import userEvent from '@testing-library/user-event';
describe('Tab test suits',()=>{

    beforeEach(()=>{
        render(<Tabs defaultValue={"a"}>
            <Tabs.Tab>
            <Tabs.Trigger value="a">Tab1</Tabs.Trigger>
            <Tabs.Trigger value="b">Tab2</Tabs.Trigger>
            <Tabs.Trigger value="c">Tab3</Tabs.Trigger>
            </Tabs.Tab>
          <Tabs.Content value="a">Tab1 content</Tabs.Content>
          <Tabs.Content value="b">Tab2 content</Tabs.Content>
          <Tabs.Content value="c">Tab3 content</Tabs.Content>
          </Tabs>)
    })
  test('default tab',()=>{
 expect(screen.getByText(/Tab1 content/i)).toBeInTheDocument()
  })
  test('tab2 click',async ()=>{
    const btn2=screen.getByText(/Tab2/i)
    await userEvent.click(btn2);
    expect(screen.getByText(/Tab2 content/i)).toBeInTheDocument();
  })
  test('tab3 click',async()=>{
    const btn2=screen.getByText(/Tab3/i)
    await userEvent.click(btn2);
    expect(screen.getByText(/Tab3 content/i)).toBeInTheDocument();
  })
  test('right arrow and enter',async()=>{

     const firstBtn=screen.getByRole('tab',{name:/tab1/i});
     firstBtn.focus();
     await userEvent.keyboard("{ArrowRight}{Enter}");
     expect(screen.getByText(/Tab2 content/i)).toBeInTheDocument();

  })
  test("left arrow wraps to last tab", async () => {
    const firstBtn = screen.getByRole("tab", { name: /tab1/i });
    firstBtn.focus();
    await userEvent.keyboard("{ArrowLeft}{Enter}");
    expect(screen.getByText(/Tab3 content/i)).toBeInTheDocument();
  });
  test("home key goes to first tab", async () => {
    const middleBtn = screen.getByRole("tab", { name: /tab2/i });
    middleBtn.focus();
    await userEvent.keyboard("{Home}{Enter}");
    expect(screen.getByText(/Tab1 content/i)).toBeInTheDocument();
  });
  
  test("end key goes to last tab", async () => {
    const middleBtn = screen.getByRole("tab", { name: /tab2/i });
    middleBtn.focus();
    await userEvent.keyboard("{End}{Enter}");
    expect(screen.getByText(/Tab3 content/i)).toBeInTheDocument();
  });
  test("aria-selected updates correctly", async () => {
    const tab1 = screen.getByRole("tab", { name: /tab1/i });
    const tab2 = screen.getByRole("tab", { name: /tab2/i });
  
    expect(tab1).toHaveAttribute("aria-selected", "true");
    await userEvent.click(tab2);
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(tab1).toHaveAttribute("aria-selected", "false");
  });
  test("only active tab content is visible", async () => {
    expect(screen.getByText(/Tab1 content/i)).toBeVisible();
    const tab2Content = screen.queryByText(/Tab2 content/i);
    expect(tab2Content).toBeNull();
  });
        

})