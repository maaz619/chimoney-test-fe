"use client"

import { FormEvent, MouseEvent, useState } from "react";

export function InputField({ value, label, placeholder, id, name, type, onChange, isRequired }: any) {
    const handleChange = (e: any) => {
        const { value } = e.target;
        onChange(value);
    };
    return (
        <div className="">
            {label && <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={name}>{label}</label>}
            <input
                required={isRequired}
                id={id}
                name={name}
                type={type}
                value={value}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder={placeholder}
                onChange={handleChange}
            />
        </div>
    );
}
export default function Form({ handleSubmit, children }: any) {

    return (
        <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
        }} >
            {...children}
        </form>
    )
}