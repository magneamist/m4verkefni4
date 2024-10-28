import React, { useRef, useState } from "react";

type DialogProps = { onClickSetName: (name: string) => void };

// The Dialog component is a dialog box that prompts the user to enter their name.
const Dialog = (props: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Opens the dialog box
  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  // Closes the dialog box
  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  const [name, setName] = useState<string>("");

  // Update the name state when the user types in the input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="App">
      <button
        id="open"
        // When the button is clicked, open the dialog box and reset the name state
        onClick={() => {
          openDialog();
          setName("");
        }}
      >
        Change name
      </button>

      <dialog id="dialog" ref={dialogRef}>
        <h2>What's your name?</h2>
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter name..."
        ></input>
        <div id="buttons">
          <button onClick={closeDialog}>Cancel</button>
          <button
            type="submit"
            // When the Done button is clicked, call the onClickSetName prop with the name state and close the dialog box
            onClick={() => {
              props.onClickSetName(name);
              closeDialog();
            }}
          >
            Done
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Dialog;
