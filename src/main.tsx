import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/appStore/store";
import App from "@/App";
import 'sanitize.css';
import '@/styles/reset.scss';
import '@/styles/global.scss';

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);
