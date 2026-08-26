# Changelog

All notable changes to **irux-router** will be documented in this file.

The format is based on **Keep a Changelog**, and this project follows **Semantic Versioning (SemVer)**.

---

## [0.3.0] - 2026-08-26

### Added

- Added support for dynamic routes.
- Added the `useParams()` hook.
- Added route parameter matching.
- Added the `ParamsContext` for route parameters.
- Added parameter support for both JSX routes and the `routes` prop.
- Added dynamic route documentation.

### Changed

- Improved the route matching engine.
- Unified parameter handling across all routing APIs.
- Improved route rendering performance for dynamic matching.
- Updated documentation with dynamic routing examples.
- Refactored route matching logic.
- Improved internal routing architecture for future nested route support.

---

## [0.2.0] - 2026-08-23

### Added

- Added `createRoutes()` for centralized route configuration.
- Added route validation.
- Added automatic route ID generation.
- Added immutable route configuration.
- Added validation for duplicate paths.
- Added validation for duplicate route IDs.
- Added validation for invalid route definitions.
- Added validation for fallback route position.
- Added support for the `routes` prop in `Router`.

### Changed

- Route IDs are now optional.
- Route IDs are automatically generated when omitted.
- Improved routing engine architecture.
- Unified route handling between JSX routes and route configuration.

---

## [0.1.0] - 2026-08-22

### Added

- Initial release.
- Added `Router`.
- Added `Route`.
- Added `Link`.
- Added `useNavigate`.
- Added `useLocation`.
- Added `NotFound`.
- Added browser History API navigation.