import React from 'react';
import { Field } from 'react-final-form';

export default function ColorPicker() {
  return (
    <Field name="variant">
      {({ input }) => (
        <div className="mt-4">
          <label className="block font-medium text-sm mb-2 text-gray-700">Card Color</label>
          <div className="flex gap-3">
            {['yellow', 'red', 'green', 'blue', 'purple', 'gray'].map((color) => {
              const colorClass = `bg-${color}-500`;
              const isSelected = input.value === color;

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => input.onChange(color)}
                  className={`w-8 h-8 rounded-full border-2 transition ${colorClass} ${
                    isSelected ? 'border-black scale-110' : 'border-transparent'
                  } focus:outline-none`}
                  title={color}
                />
              );
            })}
          </div>
        </div>
      )}
    </Field>
  );
}
