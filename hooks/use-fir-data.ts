import { useState, useEffect, useCallback } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export function useFIRData() {
  const [firs, setFirs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 8,
    pages: 0,
  });

  const fetchFIRs = useCallback(async (page = 1, search = "", filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page,
        limit: 8,
        search,
        ...filters,
      });

      const response = await fetch(`${API_BASE}/api/fir?${params}`);

      if (!response.ok) {
        throw new Error("Failed to fetch FIRs");
      }

      const data = await response.json();
      setFirs(data.data);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching FIRs:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createFIR = useCallback(async (firData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/api/fir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(firData),
      });

      if (!response.ok) {
        throw new Error("Failed to create FIR");
      }

      const data = await response.json();
      return data.data;
    } catch (err) {
      setError(err.message);
      console.error("Error creating FIR:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFIR = useCallback(async (firId, firData) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_BASE}/api/fir/${firId}`;
      console.log("Updating FIR at:", url);
      console.log("FIR Data being sent:", firData);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(firData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg =
          errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        console.error("Update failed:", errorMsg, errorData);
        throw new Error(errorMsg);
      }

      const data = await response.json();
      return data.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      console.error("Error updating FIR:", errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteFIR = useCallback(async (firId) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_BASE}/api/fir/${firId}`;
      console.log("Deleting FIR at:", url);

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg =
          errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        console.error("Delete failed:", errorMsg, errorData);
        throw new Error(errorMsg);
      }

      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      console.error("Error deleting FIR:", errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    firs,
    loading,
    error,
    pagination,
    fetchFIRs,
    createFIR,
    updateFIR,
    deleteFIR,
  };
}
