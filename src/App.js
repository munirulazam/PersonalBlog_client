import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const [name, setName] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [newName, setNewName] = useState(" ");
  const [newDescription, setNewDescription] = useState(" ");
  const [categoryList, setCategoryList] = useState([]);

  //create

  const createCategory = () => {
    axios
      .post("http://localhost:3001/create", {
        name: name,
        description: description,
      })
      .then(() => {
        setCategoryList([
          ...categoryList,
          {
            name: name,
            description: description,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //read

  const showCategory = () => {
    axios.get("http://localhost:3001/category").then((res) => {
      setCategoryList(res.data);
    });
  };

  //update
  const editCategory = (id) => {
    axios
      .put("http://localhost:3001/update", {
        name: newName,
        description: newDescription,
        id: id,
      })
      .then((res) => {
        setCategoryList(
          categoryList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: newName,
                  description: newDescription,
                }
              : val;
          })
        );
      });
  };

  //delete

  return (
    <div>
      <label>Add Category</label>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Category Name"
      />
      <input
        type="text"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Category Description"
      />
      <button onClick={createCategory}>Add Category</button>
      <button onClick={showCategory}>Show Category</button>

      <div className="categoryTable">
        <table className="table">
          <thead>
            <th>Name</th>
            <th>Description</th>
            <th>New Name</th>
            <th>New Description</th>
          </thead>
          {categoryList.map((val, key) => {
            return (
              <tr>
                <td>{val.name}</td>
                <td>{val.description}</td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                    placeholder="Update Name"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => {
                      setNewDescription(e.target.value);
                    }}
                    placeholder="Update Description"
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      editCategory(val.id);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
