import "./App.css";
import { Route, Routes } from "react-router";
import { AppMenu } from "../Home/Home";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Closet } from "../Closet/Closet";
import { Details } from "../Details/Details";
import { MyLists } from "../MyLists/MyLists";
import { List } from "../List/List";
import { AddItem } from "../AddItem/AddItem";
import { Header } from "../Header/Header";
import { Navbar } from "../Navbar/Navbar";
import { ItemNotFound } from "../ItemNotFound/ItemNotFound";
import { EditItem } from "../EditItem/EditItem";
import { AddList } from "../AddList/AddList";
import { Error } from "../Error/Error";
// @ts-ignore
import { CalendarView } from "../CalendarView/CalendarView";
// @ts-ignore
import { Date } from "../Date/Date";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<AppMenu />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/myCloset" element={<Closet />} />
        <Route path="/itemDetails/:id" element={<Details />} />
        <Route path="/lists" element={<MyLists />} />
        <Route path="/lists/:id" element={<List />} />
        <Route path="/item-not-found" element={<ItemNotFound />} />
        <Route path="/error" element={<Error />} />
        <Route path="/edit/:id" element={<EditItem />} />
        <Route path="/addList" element={<AddList />} />
        <Route path="/calendar" element={<CalendarView/>} />
        <Route path="/date/:date" element={<Date />} />
      </Routes>
      <Navbar />
    </main>
  );
};

export default App;