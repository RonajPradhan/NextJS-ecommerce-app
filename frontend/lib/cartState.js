import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
	// This is our own custom provider! we will store data (state) and functionality (updates) in here and anyone can access it via the consumer!

	const [cartOpen, setCartOpen] = useState(false);

	const toggleCart = () => {
		setCartOpen(!cartOpen);
	};

	const closeCart = () => {
		setCartOpen(false);
	};

	const openCart = () => {
		setCartOpen(true);
	};

	return (
		<LocalStateProvider
			value={{ cartOpen, toggleCart, closeCart, openCart }}
		>
			{children}
		</LocalStateProvider>
	);
}

// Make a custom hook to access the cart local state

function useCart() {
	const all = useContext(LocalStateContext);
	return all;
}

export { CartStateProvider, useCart };
