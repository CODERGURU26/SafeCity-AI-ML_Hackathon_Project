# 💻 Code Examples & Usage Patterns

## Table of Contents

1. [React Hook Usage](#react-hook-usage)
2. [API Examples](#api-examples)
3. [Component Examples](#component-examples)
4. [Error Handling](#error-handling)
5. [Advanced Patterns](#advanced-patterns)

---

## React Hook Usage

### Basic Usage - Fetch FIRs

```jsx
"use client";

import { useFIRData } from "@/hooks/use-fir-data";
import { useEffect } from "react";

export function FIRList() {
  const { firs, loading, error, fetchFIRs } = useFIRData();

  useEffect(() => {
    // Fetch first page
    fetchFIRs(1);
  }, []);

  if (loading) return <div>Loading FIRs...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!firs.length) return <div>No FIRs found</div>;

  return (
    <ul>
      {firs.map((fir) => (
        <li key={fir.firId}>
          {fir.firId} - {fir.type} ({fir.status})
        </li>
      ))}
    </ul>
  );
}
```

### With Search & Filters

```jsx
"use client";

import { useFIRData } from "@/hooks/use-fir-data";
import { useState, useEffect } from "react";

export function FilteredFIRList() {
  const { firs, fetchFIRs, pagination } = useFIRData();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchFIRs(page, search, {
      status: status || undefined,
      priority: priority || undefined,
    });
  }, [page, search, status, priority, fetchFIRs]);

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="investigating">Investigating</option>
          <option value="closed">Closed</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="results">
        {firs.map((fir) => (
          <div key={fir.firId} className="fir-card">
            <h3>{fir.firId}</h3>
            <p>Type: {fir.type}</p>
            <p>Status: {fir.status}</p>
            <p>Priority: {fir.priority}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <p>
          Page {page} of {pagination.pages}
        </p>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === pagination.pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

### Create New FIR

```jsx
"use client";

import { useFIRData } from "@/hooks/use-fir-data";
import { useState } from "react";

export function CreateFIRForm() {
  const { createFIR, loading, error } = useFIRData();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    time: "",
    type: "Theft",
    location: "",
    complainant: "",
    status: "open",
    priority: "medium",
    officer: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newFIR = await createFIR(formData);
      alert(`FIR created: ${newFIR.firId}`);
      // Reset form
      setFormData({
        date: new Date().toISOString().split("T")[0],
        time: "",
        type: "Theft",
        location: "",
        complainant: "",
        status: "open",
        priority: "medium",
        officer: "",
        description: "",
      });
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Crime Type</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option>Theft</option>
          <option>Assault</option>
          <option>Fraud</option>
          <option>Robbery</option>
          <option>Vandalism</option>
          <option>Cyber Crime</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Complainant Name</label>
        <input
          type="text"
          name="complainant"
          value={formData.complainant}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Officer</label>
        <input
          type="text"
          name="officer"
          value={formData.officer}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create FIR"}
      </button>

      {error && <div className="error">{error}</div>}
    </form>
  );
}
```

### Update FIR Status

```jsx
"use client";

import { useFIRData } from "@/hooks/use-fir-data";

export function UpdateFIRStatus({ firId, currentStatus }) {
  const { updateFIR, loading } = useFIRData();

  const handleStatusChange = async (newStatus) => {
    try {
      await updateFIR(firId, { status: newStatus });
      alert(`Status updated to ${newStatus}`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const statuses = ["open", "investigating", "closed"];

  return (
    <div className="status-selector">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => handleStatusChange(status)}
          disabled={loading || status === currentStatus}
          className={status === currentStatus ? "active" : ""}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
```

---

## API Examples

### Using Fetch Directly

If you prefer not to use the hook, you can call the API directly:

```jsx
// Fetch FIRs
const response = await fetch("/api/fir?page=1&limit=8&status=open");
const data = await response.json();
console.log(data.data); // Array of FIRs
console.log(data.pagination); // { total, page, limit, pages }

// Create FIR
const createResponse = await fetch("/api/fir", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    date: "2024-01-27",
    time: "15:30",
    type: "Theft",
    location: "Bandra",
    complainant: "John Doe",
    status: "open",
    priority: "high",
    officer: "SI Patil",
  }),
});
const newFIR = await createResponse.json();
console.log(newFIR.data.firId); // New FIR ID

// Update FIR
const updateResponse = await fetch("/api/fir/FIR-2024-1847", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status: "closed" }),
});

// Delete FIR
const deleteResponse = await fetch("/api/fir/FIR-2024-1847", {
  method: "DELETE",
});
```

---

## Component Examples

### Complete FIR Detail View

```jsx
"use client";

import { useFIRData } from "@/hooks/use-fir-data";
import { useEffect, useState } from "react";

export function FIRDetailView({ firId }) {
  const { firs, loading, error, fetchFIRs } = useFIRData();
  const [fir, setFIR] = useState(null);

  useEffect(() => {
    // Fetch single FIR by searching (or implement individual fetch)
    fetch(`/api/fir/${firId}`)
      .then((r) => r.json())
      .then((data) => setFIR(data.data))
      .catch((err) => console.error(err));
  }, [firId]);

  if (loading) return <div>Loading...</div>;
  if (!fir) return <div>FIR not found</div>;

  return (
    <div className="fir-detail">
      <h1>{fir.firId}</h1>

      <div className="grid">
        <div>
          <h2>Incident Details</h2>
          <p>
            <strong>Type:</strong> {fir.type}
          </p>
          <p>
            <strong>Date:</strong> {fir.date}
          </p>
          <p>
            <strong>Time:</strong> {fir.time}
          </p>
          <p>
            <strong>Location:</strong> {fir.location}
          </p>
        </div>

        <div>
          <h2>Case Status</h2>
          <p>
            <strong>Status:</strong> {fir.status}
          </p>
          <p>
            <strong>Priority:</strong> {fir.priority}
          </p>
          <p>
            <strong>Officer:</strong> {fir.officer}
          </p>
        </div>

        <div>
          <h2>Complainant</h2>
          <p>{fir.complainant}</p>
        </div>

        {fir.description && (
          <div>
            <h2>Description</h2>
            <p>{fir.description}</p>
          </div>
        )}

        {fir.evidence && (
          <div>
            <h2>Evidence</h2>
            <p>{fir.evidence}</p>
          </div>
        )}

        {fir.notes && (
          <div>
            <h2>Notes</h2>
            <p>{fir.notes}</p>
          </div>
        )}
      </div>

      <div className="timestamps">
        <small>Created: {new Date(fir.createdAt).toLocaleString()}</small>
        <small>Updated: {new Date(fir.updatedAt).toLocaleString()}</small>
      </div>
    </div>
  );
}
```

---

## Error Handling

### Comprehensive Error Handling

```jsx
"use client";

import { useFIRData } from "@/hooks/use-fir-data";
import { useEffect, useState } from "react";

export function SafeFIRComponent() {
  const { firs, loading, error, fetchFIRs } = useFIRData();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    try {
      fetchFIRs(1);
    } catch (err) {
      console.error("Failed to fetch FIRs:", err);
    }
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  if (loading && firs.length === 0) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <p>Loading FIRs...</p>
      </div>
    );
  }

  if (error && firs.length === 0) {
    return (
      <div className="error-state">
        <h2>⚠️ Error Loading FIRs</h2>
        <p>{error}</p>
        <p className="hint">Make sure MongoDB is configured in .env.local</p>
        <button onClick={handleRetry}>Retry ({retryCount} attempts)</button>
      </div>
    );
  }

  if (firs.length === 0) {
    return (
      <div className="empty-state">
        <p>No FIRs found</p>
        <button onClick={() => setRetryCount((r) => r + 1)}>Refresh</button>
      </div>
    );
  }

  return (
    <div>
      {error && <div className="warning">⚠️ {error} (showing cached data)</div>}

      <table>
        <tbody>
          {firs.map((fir) => (
            <tr key={fir.firId}>
              <td>{fir.firId}</td>
              <td>{fir.type}</td>
              <td>{fir.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## Advanced Patterns

### Pagination Component

```jsx
"use client";

import { useFIRData } from "@/hooks/use-fir-data";
import { useState, useEffect } from "react";

export function PaginatedFIRList() {
  const { firs, pagination, fetchFIRs } = useFIRData();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchFIRs(page);
  }, [page]);

  const pages = Array.from({ length: pagination.pages }, (_, i) => i + 1);

  return (
    <div>
      <div className="fir-list">
        {firs.map((fir) => (
          <div key={fir.firId}>
            {fir.firId} - {fir.type}
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          ← Previous
        </button>

        <div className="page-numbers">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={p === page ? "active" : ""}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPage(Math.min(pagination.pages, page + 1))}
          disabled={page === pagination.pages}
        >
          Next →
        </button>
      </div>

      <p>
        Page {page} of {pagination.pages} ({pagination.total} total)
      </p>
    </div>
  );
}
```

### Batch Operations

```jsx
"use client";

import { useFIRData } from "@/hooks/use-fir-data";
import { useState } from "react";

export function BulkUpdateFIRs() {
  const { updateFIR } = useFIRData();
  const [selectedIds, setSelectedIds] = useState([]);
  const [newStatus, setNewStatus] = useState("closed");
  const [updating, setUpdating] = useState(false);

  const handleBulkUpdate = async () => {
    setUpdating(true);
    try {
      await Promise.all(
        selectedIds.map((id) => updateFIR(id, { status: newStatus })),
      );
      alert(`Updated ${selectedIds.length} FIRs`);
      setSelectedIds([]);
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <div>
        <label>New Status:</label>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option>open</option>
          <option>investigating</option>
          <option>closed</option>
        </select>
      </div>

      <button
        onClick={handleBulkUpdate}
        disabled={selectedIds.length === 0 || updating}
      >
        Update {selectedIds.length} FIRs
      </button>
    </div>
  );
}
```

---

**More examples coming soon! Check back for:**

- Real-time updates with WebSockets
- Export to CSV/PDF
- Advanced filtering
- Data visualization
- Analytics queries
