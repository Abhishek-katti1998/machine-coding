import Tabs from "./Tabs";

export default function TabWrapper(){
    
return <Tabs defaultValue={"a"}>
    <Tabs.Tab>
    <Tabs.Trigger value="a">Tab1</Tabs.Trigger>
    <Tabs.Trigger value="b">Tab2</Tabs.Trigger>
    <Tabs.Trigger value="c">Tab3</Tabs.Trigger>
    </Tabs.Tab>
  <Tabs.Content value="a">Tab1 content</Tabs.Content>
  <Tabs.Content value="b">Tab2 content</Tabs.Content>
  <Tabs.Content value="c">Tab3 content</Tabs.Content>
</Tabs>


}