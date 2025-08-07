# Vehicle Specification Management Portal

## 1. Overview & Purpose
The Vehicle Specification Management Portal is a critical back-office system designed for internal data teams at VehiclesData. Its primary purpose is to serve as the single source of truth for all vehicle data. This portal allows for the meticulous creation, editing, and maintenance of structured, market-specific vehicle specifications.

High-quality data entered here directly powers all public-facing and API-driven features, including the VIN Decoder, the Vehicle Catalog, and the Valuation Engine. The portal is designed to ensure data accuracy, consistency, and integrity.

## 2. User Roles & Permissions
The portal is designed to accommodate three distinct levels of access:

- **Data Administrator**: Full create, read, update, and delete (CRUD) capabilities. Can publish, archive, and delete vehicle records. Has access to all management tools, including bulk imports.
- **Data Contributor**: Can create new vehicle entries and edit existing ones. Cannot publish changes to make them live or delete records. All submissions are saved as "Draft" for review by an Administrator.
- **Read-Only Viewer**: Can view all vehicle specification data but cannot make any changes. This role is ideal for quality assurance, internal review, or providing access to trusted external partners like OEMs.

## 3. Module 1: Vehicle Specifications Dashboard (`/admin/specs`)
### 3.1. Functional Requirements
- **View All Records**: Display a comprehensive, paginated list of all vehicle specifications in the database.
- **Search & Filter**: Provide robust controls to quickly locate specific records:
  - A primary search bar for Make, Model, or Trim.
  - Dropdown filters for Region and Model Year.
- **Add New Specification**: A primary call-to-action button that navigates to the "Add/Edit Specification" form in "add" mode.
- **Edit Specification**: Each record in the table must have a clear entry point (e.g., an "Edit" button) that navigates to the form in "edit" mode, pre-populated with that record's data.
- **Bulk Actions**:
  - **Bulk Import**: An action to upload a CSV/Excel file of new vehicle specifications. The system must validate the file against a predefined schema.
  - **Export to CSV**: An action to download the currently filtered list of specifications as a CSV file.

### 3.2. UI & Design Guidelines
- **Layout**: Resides within the standard admin layout, ensuring consistent navigation.
- **Header**: A clear page title ("Vehicle Specifications") and the primary "+ Add Specification" button.
- **Filter Bar**: A dedicated component below the header that houses all search and filter controls for an organized user experience.
- **Data Table**:
  - **Responsiveness**: The table must be horizontally scrollable on smaller viewports to prevent layout breakage and ensure all data is accessible.
  - **Columns**:
    - **Vehicle**: Displays Year, Make, and Model in a primary line, with Trim as a secondary line for clear hierarchy.
    - **Region**: The specific market region (e.g., "UAE").
    - **Status**: A color-coded Status Badge for at-a-glance recognition.
    - **Last Updated**: A human-readable date.
    - **Actions**: A right-aligned column with an icon-only "Edit" button.
  - **Status Badges**:
    - **Published**: Green, indicating the data is live.
    - **Draft**: Amber/Yellow, indicating it is pending review.
    - **Archived**: Gray, indicating it is no longer active but retained for records.
  - **Interactivity**: Table rows have a subtle hover effect. Interactive elements have clear focus states for accessibility.

## 4. Module 2: Add/Edit Specification Form (`/admin/specs/add`, `/admin/specs/edit/:id`)
### 4.1. Functional Requirements
- **Dual Mode**: The component must function for both creating a new record and editing an existing one, determined by the URL.
- **Tabbed Data Entry**: The form is divided into logical tabs to manage the complexity of the data and prevent user overload. The user can navigate between tabs to complete different sections of the specification.
- **Saving & Publishing**:
  - **Save Draft**: Allows the user to save their progress at any time without making the data live. This is crucial for long data entry sessions.
  - **Publish**: Saves the data and sets its status to "Published," making it available to the rest of the application.
- **Navigation**: A clear breadcrumb or link must be present to return to the main dashboard.

### 4.2. UI & Design Guidelines
- **Layout**: A two-column layout is used for clarity on larger screens.
  - **Left Column**: A vertical navigation list of all the form tabs.
  - **Right Column**: The main content area where the form fields for the active tab are rendered.
- **Sticky Header**: The page header, containing the page title and the "Save Draft" / "Publish" action buttons, must remain fixed at the top of the viewport as the user scrolls. This ensures that primary actions are always accessible without needing to scroll to the top or bottom of a long form.
- **Tab Navigation**:
  - The currently active tab is visually highlighted with a distinct background color and text weight to orient the user.
  - The layout is fully responsive, stacking vertically on mobile devices.
- **Form Content**:
  - Each tab has a clear title (e.g., "Core Info Details").
  - Form fields are organized logically within a grid.
  - **Dependent Dropdowns**: The "Model" dropdown should ideally be dependent on the "Make" selection.
  - **Complex Fields**: Feature sets (Safety, Interior, etc.) should be presented as groups of checkboxes for easy multi-selection. The visual asset uploader should allow for multiple images.
  - **Validation**: All required fields must be clearly marked. Client-side validation should prevent form submission if required fields are empty, providing clear error messages.

## 5. Data Structure
The form is built to capture data that conforms to the `VehicleSpecification` interface:

- **Core Info**: `make`, `model`, `trim`, `year`, `bodyStyle`, `region`, `vinPattern`.
- **Powertrain**: `displacementL`, `engineCode`, `horsepower`, `torqueNm`, `cylinders`, `fuelType`, `transmission`, `drivetrain`.
- **Dimensions**: `lengthMm`, `widthMm`, `heightMm`, `wheelbaseMm`, `fuelTankL`, `trunkVolumeL`, `weightKg`.
- **Features**: Grouped multi-select fields for `safety`, `interior`, `infotainment`, `exterior`.
- **Pricing**: `msrp`, `marketPriceMin`, `marketPriceMax`, `depreciationRate`.
- **Visuals**: Uploader for multiple images, each with a tag (e.g., "front", "interior").
- **Metadata**: System-managed fields like `id`, `status`, `version`, and `lastUpdated`.

