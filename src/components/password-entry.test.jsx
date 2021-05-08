import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import PasswordCreate from "./password-entry";

/////////////////////////////////////////////////////////////////////
// Helper functions
/////////////////////////////////////////////////////////////////////
const getRender = () => {
	render(<PasswordCreate />);
	const button = document.querySelector("[data-testid=change-password]");
	const msg = document.querySelector("[data-testid=msg]");
	const password = document.querySelector("[data-testid=password]");
	const password2 = document.querySelector("[data-testid=password2]");

	return [password, password2, msg, button];
};

const click = (button) => {
	act(() => {
		button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
};

/////////////////////////////////////////////////////////////////////
// Tests
/////////////////////////////////////////////////////////////////////
test("renders Change Password elements", () => {
	render(<PasswordCreate />);
	const title = screen.getAllByText(/Change Password/i);
	expect(title.length).toBe(2);
});

it("password required when clicked", () => {
	const [password, password2, msg, button] = getRender();
	click(button);
	expect(msg.innerHTML).toBe("Password required");
});

it("more than 6 required when clicked", () => {
	const [password, password2, msg, button] = getRender();
	password.value = "a";
	click(button);
	expect(msg.innerHTML).toBe("Password must have at least 6 characters");
});

it("a capital letter required when clicked", () => {
	const [password, password2, msg, button] = getRender();
	password.value = "aaaaaa";
	click(button);
	expect(msg.innerHTML).toBe("Password must have at least one capital letter");
});

it("a lower case letter required when clicked", () => {
	const [password, password2, msg, button] = getRender();
	password.value = "AAAAAA";
	click(button);
	expect(msg.innerHTML).toBe(
		"Password must have at least one lower case letter"
	);
});

it("a number required when clicked", () => {
	const [password, password2, msg, button] = getRender();
	password.value = "aaaaaaA";
	click(button);
	expect(msg.innerHTML).toBe("Password must have at least one number");
});

it("a special char required when clicked", () => {
	const [password, password2, msg, button] = getRender();
	password.value = "aaaaaaA3";
	click(button);
	expect(msg.innerHTML).toBe(
		"Password must have at least one special character"
	);
});

it("passwords don't match when clicked", () => {
	const [password, password2, msg, button] = getRender();
	password.value = "aaaaaaA3@";
	click(button);
	expect(msg.innerHTML).toBe("Passwords don't match");
});

it("success when clicked", () => {
	const [password, password2, msg, button] = getRender();
	password.value = "aaaaaaA3@";
	password2.value = "aaaaaaA3@";
	click(button);
	expect(msg.innerHTML).toBe("Success");
});
