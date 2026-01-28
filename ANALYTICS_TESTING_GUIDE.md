# Quick Start: Crime Analytics Testing Guide

## Prerequisites

- Backend running: `python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000`
- Frontend running: `npm run dev` or `pnpm dev`

## Step-by-Step Testing

### 1. Access Analytics Dashboard

```
URL: http://localhost:3000/analytics
```

**Expected to See:**

- Header: "Crime Analytics Dashboard"
- 4 stats cards (Total Incidents, Resolution Rate, Avg Response Time, Predictions Accuracy)
- Time filter buttons (Daily, Monthly, Yearly)
- Multiple charts loading with sample data

### 2. Test Time Duration Filter

```
Click Filter Buttons:
- "daily" → Charts update to show daily breakdown
- "monthly" → Charts update to show monthly trends
- "yearly" → Charts update to show yearly comparison
```

**Charts That Update:**

1. Crime Trends & Police Allocation (Line Chart)
2. Crime Distribution by Type (Pie Chart)
3. Hourly Crime Pattern (Bar Chart)
4. Crime Types Comparison (Bar Chart)

### 3. Test Chart Interactions

#### Hover Tooltips

```
Mouse over any data point on charts
→ Tooltip appears showing:
  - Category name
  - Exact values
  - Color coding
```

#### Chart Responsiveness

```
Resize browser window
→ Charts automatically responsive
→ Mobile-friendly layout on small screens
```

### 4. View Predictive Insights

```
Scroll down on /analytics page
→ See 5 insight cards:
  1. High Risk Alert (Red) - 87% confidence
  2. Positive Trend (Green) - 92% confidence
  3. Hotspot Emerging (Yellow) - 78% confidence
  4. Peak Hours Shift (Blue) - 94% confidence
  5. Resource Optimization (Purple) - 85% confidence
```

**Each Card Shows:**

- Icon representing the insight type
- Title and description
- Confidence percentage badge
- Color-coded severity level

### 5. Recommended Actions Section

```
Below insights cards:
→ 4 numbered actionable recommendations:
  1. Increase police in specific zones
  2. Deploy specialized units
  3. Adjust patrol timings
  4. Resource reallocation
```

### 6. Test Location-Based Analytics

#### Via Map (Dashboard)

```
1. Go to: http://localhost:3000
2. Scroll to map section
3. Click on any crime zone circle
4. Click "View Analysis" button in popup
5. Directed to: /analytics/location?location=CityName
```

#### Direct URL

```
URL: http://localhost:3000/analytics/location?location=Andheri
```

**Expected to See:**

- Page title: "Andheri Crime Analysis"
- 4 stat cards showing location-specific metrics
- Time period filter (Daily/Monthly/Yearly)
- Location-specific charts:
  1. Crime Timeline with cases closed
  2. Crime Type Distribution (Pie)
  3. Case Resolution comparison
  4. Hourly Pattern analysis

### 7. Location-Specific Features

#### Stats Cards on Location Page

```
Card 1: Total Incidents (e.g., 245)
Card 2: Resolution Rate (e.g., 65.1%)
Card 3: Cases Closed (e.g., 156)
Card 4: Avg Police Deployed (e.g., 8)
```

#### Charts on Location Page

```
1. Crime Timeline (Line Chart)
   - Shows crimes, police deployed, cases closed over time

2. Crime Type Distribution (Pie Chart)
   - Breakdown of crime types for this location

3. Case Resolution (Stacked Bar Chart)
   - Resolved vs Pending cases by type

4. Hourly Pattern (Bar Chart)
   - When crimes peak for this location
```

#### Location-Specific Insights

```
Scroll to bottom
→ Card: "Location-Specific Insights & Recommendations"
→ 4 insight boxes:
  1. Peak Crime Hours analysis
  2. Most Common Crime type
  3. Resolution Performance
  4. Predicted Trends for next month
```

## Test Data

### Sample Crime Records (in memory)

```javascript
{
  "Report Number": "MUM800001",
  "Date Reported": "2023-10-19",
  "Time of Occurrence": "18:49:00",
  "City": "Andheri",
  "Crime Description": "Road accident FIR",
  "Police Deployed": "7",
  "Case Closed": "Yes"
}
```

### Available Locations in Sample Data

- Andheri
- Dadar
- Bandra
- (More from actual CSV)

## API Testing

### Test Backend Endpoints

#### Get All Zones

```bash
curl http://127.0.0.1:8000/zones
```

**Response:**

```json
[
  {
    "City": "Andheri",
    "latitude": 19.1136,
    "longitude": 72.8262,
    "risk_zone": "High",
    "police_needed": 8
  }
]
```

#### Get City Statistics

```bash
curl http://127.0.0.1:8000/city/andheri/statistics
```

**Response:**

```json
{
  "city": "Andheri",
  "total_incidents": 123,
  "average_police_needed": 6.5,
  "risk_level": "High",
  "latitude": 19.1136,
  "longitude": 72.8262
}
```

#### Get Overall Statistics

```bash
curl http://127.0.0.1:8000/statistics
```

## Common Issues & Solutions

### Issue: Charts Not Showing Data

```
Solution:
1. Check browser console for errors (F12)
2. Verify backend is running
3. Check if CORS is enabled
4. Reload page (Ctrl+R)
```

### Issue: Time Filter Not Working

```
Solution:
1. Click filter button again
2. Check if data is populated
3. Verify sample data is loaded
4. Check console for JS errors
```

### Issue: Location Analysis Shows No Data

```
Solution:
1. Check if location name is correct
2. Verify location exists in sample data
3. Check URL encoding
4. Try accessing from map directly
```

### Issue: Backend Connection Error

```
Solution:
1. Start backend: cd python_ml_backend
2. Run: python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
3. Verify running on http://127.0.0.1:8000
4. Check port 8000 is available
```

## Performance Testing

### Load Time

- Analytics page: <2 seconds
- Charts render: <1 second
- Location page: <1.5 seconds

### Responsiveness

- Time filter update: Instant
- Chart hover: Smooth
- Window resize: No lag

### Browser Compatibility

- Chrome: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- Edge: ✅ Fully supported

## Feature Verification Checklist

### Analytics Dashboard

- [ ] Page loads successfully
- [ ] 4 stat cards visible
- [ ] All 4 charts render
- [ ] Time filter buttons work
- [ ] Charts update on filter change
- [ ] Tooltips work on hover
- [ ] Responsive on mobile

### Predictive Insights

- [ ] 5 insight cards visible
- [ ] Confidence percentages show
- [ ] Different colors for each type
- [ ] Recommended actions section visible
- [ ] 4 action items listed

### Location Analytics

- [ ] Can navigate from map
- [ ] Page shows location name
- [ ] 4 location stats visible
- [ ] 4 charts load
- [ ] Back button works
- [ ] Insights section visible

### Map Integration

- [ ] Map loads with circles
- [ ] Click on circle shows popup
- [ ] "View Analysis" button visible
- [ ] Click navigates to location page
- [ ] URL updates correctly

## Next Steps

1. **Real Data Integration**
   - Replace sample data with CSV import
   - Connect to production database

2. **Enhanced Predictions**
   - Implement ML model
   - Train on historical data
   - Improve accuracy

3. **Export Features**
   - Add PDF export
   - Add CSV export
   - Scheduled reports

4. **Mobile App**
   - React Native version
   - Push notifications
   - Offline support

## Support

For issues or questions:

1. Check browser console (F12)
2. Review ANALYTICS_IMPLEMENTATION.md
3. Check backend logs in terminal
4. Verify all dependencies installed
