# Alcaldía Inventory & Request Management System

A complete, professional inventory control and material request management system built for city halls with role-based access, workflow management, and full audit logging.

## Features

### 1. Authentication & Authorization
- Secure login system with role-based access control
- Two user roles: Administrator and Department User
- Session management with localStorage persistence

### 2. Dashboard
- Real-time statistics (total items, low stock, pending requests, total quantity)
- Stock levels chart showing items near minimum thresholds
- Inventory distribution by category
- Quick overview of system status

### 3. Inventory Management
- Full CRUD operations for inventory items
- Track quantity, categories, unit of measure, and minimum stock levels
- Low stock warnings and alerts
- Search and filter capabilities
- Audit trail for all inventory changes

### 4. Material Requests Workflow
- Department users can create material requests
- Request types: Office or Operative
- Multiple items per request
- Admin approval/rejection workflow
- Automatic inventory deduction on approval
- Full request history tracking

### 5. Departments & Users Management
- Admin panel for managing departments
- User management with role assignment
- Department assignment for department users
- User activation/deactivation
- Password management

### 6. Audit Logging
- Comprehensive audit trail for all system activities
- Track CREATE, UPDATE, DELETE, APPROVE, and REJECT actions
- Filter by date, user, action, and module
- User-friendly timestamp formatting

## Demo Credentials

Login with these demo accounts to explore the system:

### Administrator
- **Email:** admin@alcaldia.gov
- **Password:** admin123

### IT Department User
- **Email:** it@alcaldia.gov
- **Password:** it123

### HR Department User
- **Email:** hr@alcaldia.gov
- **Password:** hr123

## Technology Stack

- **Frontend Framework:** Next.js 16 (App Router)
- **UI Components:** Shadcn/ui
- **Styling:** Tailwind CSS
- **Data Visualization:** Recharts
- **Data Persistence:** localStorage (100% client-side, no backend required)
- **Date Handling:** date-fns
- **Form Handling:** React built-in with validation
- **State Management:** React hooks + Context API

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with AuthProvider
│   ├── page.tsx                # Home page (redirects to dashboard)
│   ├── login/page.tsx          # Login page
│   ├── dashboard/page.tsx      # Dashboard with charts
│   ├── inventory/page.tsx      # Inventory management
│   ├── requests/
│   │   ├── page.tsx            # Requests listing & management
│   │   └── new/page.tsx        # Create new request
│   ├── settings/
│   │   ├── departments/page.tsx # Departments management
│   │   └── users/page.tsx      # Users management
│   ├── audit/page.tsx          # Audit log viewer
│   └── globals.css             # Global styles
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Top header with user menu
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── MobileNav.tsx       # Mobile bottom navigation
│   │   └── DashboardLayout.tsx # Dashboard layout wrapper
│   ├── dashboard/
│   │   ├── QuickStats.tsx      # Statistics cards
│   │   └── Charts.tsx          # Dashboard charts
│   ├── inventory/
│   │   ├── InventoryTable.tsx  # Inventory data table
│   │   ├── InventoryForm.tsx   # Add/Edit form
│   │   └── DeleteDialog.tsx    # Delete confirmation
│   └── ui/                     # Shadcn/ui components (pre-installed)
│
├── hooks/
│   ├── useAuth.ts              # Authentication context & hook
│   └── useStorage.ts           # Storage management hooks
│
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── storage.ts              # Storage operations & sample data
│   ├── auth.ts                 # Authentication utilities
│   ├── constants.ts            # App constants
│   └── utils.ts                # Utility functions
│
└── public/                     # Static assets
```

## Key Workflows

### User Login
1. User navigates to `/login`
2. Enters email and password
3. System authenticates against localStorage users
4. Creates session and redirects to dashboard

### Create Material Request (Department User)
1. Navigate to "My Requests" → "New Request"
2. Select request type (Office/Operative)
3. Add items with quantities
4. Provide reason for request
5. Submit request (goes to "pending" status)
6. Admin reviews and approves/rejects
7. On approval: inventory is automatically deducted

### Approve Request (Admin)
1. Navigate to "Requests"
2. View all pending requests
3. Click "View Details" on a request
4. Click "Approve" button
5. System automatically:
   - Updates request status to "approved"
   - Records approval timestamp and approver
   - Deducts quantities from inventory
   - Creates audit log entry

### Manage Inventory (Admin)
1. Navigate to "Inventory"
2. View all items with current quantities and stock levels
3. Add new items with "Add Item" button
4. Edit items by clicking the menu and selecting "Edit"
5. Delete items with confirmation
6. All changes are automatically logged in audit trail

## Data Storage

All data is stored in the browser's localStorage with the prefix `inventory-system:`. This means:

✅ No backend server required
✅ Data persists across browser sessions
✅ Works offline after initial load
✅ Perfect for small to medium-sized organizations

⚠️ **Important:** Data is local to each browser. If users switch browsers or clear localStorage, data will be lost (except sample data which reinitializes).

## Sample Data

On first load, the system initializes with sample data:
- 3 departments (IT, HR, Maintenance)
- 3 demo users (1 admin, 2 department users)
- 5 sample inventory items across different categories

You can delete this data and create your own, or modify the sample data initialization in `lib/storage.ts`.

## Features Summary

| Feature | Admin | Department User |
|---------|-------|-----------------|
| View Dashboard | ✓ | ✓ (filtered data) |
| Manage Inventory | ✓ | ✗ |
| Create Requests | ✗ | ✓ |
| View All Requests | ✓ | ✗ (only own) |
| Approve/Reject Requests | ✓ | ✗ |
| Manage Departments | ✓ | ✗ |
| Manage Users | ✓ | ✗ |
| View Audit Log | ✓ | ✗ |

## Responsive Design

- **Mobile (< 768px):** Bottom navigation bar, collapsible content
- **Tablet (768px - 1024px):** Responsive grid layouts
- **Desktop (> 1024px):** Full sidebar navigation, multi-column layouts

All pages are optimized for mobile-first design with progressive enhancement for larger screens.

## Getting Started

1. **Install Dependencies:**
   ```bash
   pnpm install
   ```

2. **Run Development Server:**
   ```bash
   pnpm dev
   ```

3. **Open in Browser:**
   - Navigate to `http://localhost:3000`
   - Login with demo credentials
   - Explore the system

## Configuration

### Modifying Demo Data
Edit `lib/storage.ts` - look for `initializeSampleData()` function to modify initial departments, users, and inventory.

### Customizing Categories
Edit `lib/constants.ts` - modify the `CATEGORIES` array to match your organization's needs.

### Changing Color Scheme
Edit `app/globals.css` - modify the CSS custom properties in the `:root` section to change the color palette.

## Security Considerations

⚠️ **This is a demo application**. For production use:
1. Implement proper password hashing (bcrypt, argon2)
2. Use secure session tokens (JWT, secure cookies)
3. Add CSRF protection
4. Implement rate limiting
5. Use a backend database instead of localStorage
6. Add encryption for sensitive data
7. Implement proper authentication middleware
8. Add role-based API access control

## Limitations

- localStorage has ~5-10MB size limit (usually sufficient for this use case)
- Data is not shared across devices or browsers
- No real-time synchronization between users
- No backup or recovery system

## Future Enhancements

- Database backend (PostgreSQL, MongoDB)
- Real-time collaboration
- Advanced reporting and analytics
- Email notifications
- API integration with external systems
- Mobile app (React Native)
- Print/export functionality
- Batch operations
- Item templates and presets

## Support

For questions or issues, refer to the code comments throughout the codebase. Each component and utility function is well-documented.

---

**Built with ❤️ for efficient inventory management in city halls and government organizations.**
