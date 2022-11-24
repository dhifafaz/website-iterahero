import "./App.css";
import Board from "./component/board/board";
import Login from "./page/login/login";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Dashboard from "./page/dashboard/dashboard";
import GreenHouse from "./page/greenhouse/greenhouse";
import Monitoring from "./page/monitoring/monitoring";
import Controlling from "./page/controlling/controlling";
import Notification from "./page/notification/notification";
import GreenhouseAdd from "./page/greenhouse/greenhouse_add";
import GreenhouseEdit from "./page/greenhouse/greenhouse_edit";
import Monitoring_Add from "./page/monitoring/monitoring_add";
import Controlling_Add from "./page/controlling/controlling_add";
import Monitoring_Edit from "./page/monitoring/monitoring_edit";
import Controlling_Edit from "./page/controlling/controlling_edit";
import MoreNotification from "./page/notification/more_notification";
import Grafik from "./page/grafik/grafik";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/login" replace />} />
			<Route path="/login" element={<Login />} />
			<Route path="/unit" element={<Board />}>
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="greenhouse" element={<GreenHouse />} />
				<Route path="monitoring" element={<Monitoring />} />
				<Route path="controlling" element={<Controlling />} />
				<Route path="historynotifikasi" element={<Notification />} />
				<Route
					path="historynotifikasi/more-notifcation"
					element={<MoreNotification />}
				/>
				<Route path='dashboard/sensor/:id' element={<Grafik />} />
				<Route path="greenhouse/add" element={<GreenhouseAdd />} />
				<Route path="greenhouse/:slug" element={<GreenhouseEdit />} />
				<Route path="monitoring/add/:id" element={<Monitoring_Add />} />
				<Route path="controlling/add/:id" element={<Controlling_Add />} />
				<Route path="monitoring/edit/:id" element={<Monitoring_Edit />} />
				<Route path="controlling/edit/:id" element={<Controlling_Edit />} />
			</Route>
		</Routes>
	);
}

export default App;
