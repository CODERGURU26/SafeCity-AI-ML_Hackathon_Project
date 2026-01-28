import { useState, useEffect, useCallback } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

// Mock FIR data for fallback
const mockFIRs = [
  {
    _id: "1",
    firId: "FIR-2024-1847",
    date: "2024-01-27",
    time: "14:32",
    type: "Theft",
    location: "Andheri West",
    complainant: "Rajesh Kumar",
    status: "open",
    priority: "high",
    officer: "SI Patil",
  },
  {
    _id: "2",
    firId: "FIR-2024-1846",
    date: "2024-01-27",
    time: "12:15",
    type: "Assault",
    location: "Bandra",
    complainant: "Priya Sharma",
    status: "investigating",
    priority: "high",
    officer: "SI Deshmukh",
  },
  {
    _id: "3",
    firId: "FIR-2024-1845",
    date: "2024-01-27",
    time: "10:45",
    type: "Fraud",
    location: "Powai",
    complainant: "Amit Verma",
    status: "open",
    priority: "medium",
    officer: "SI Kulkarni",
  },
  {
    _id: "4",
    firId: "FIR-2024-1844",
    date: "2024-01-26",
    time: "22:30",
    type: "Robbery",
    location: "Kurla",
    complainant: "Sunita Patel",
    status: "closed",
    priority: "high",
    officer: "SI Jadhav",
  },
];

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
        // Use mock data as fallback
        setFirs(mockFIRs);
        setPagination({
          total: mockFIRs.length,
          page: 1,
          limit: 8,
          pages: Math.ceil(mockFIRs.length / 8),
        });
        return;
      }

      const data = await response.json();
      setFirs(data.data);
      setPagination(data.pagination);
    } catch (err) {
      // Use mock data on error
      console.error("Error fetching FIRs, using mock data:", err);
      setFirs(mockFIRs);
      setPagination({
        total: mockFIRs.length,
        page: 1,
        limit: 8,
        pages: Math.ceil(mockFIRs.length / 8),
      });
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
