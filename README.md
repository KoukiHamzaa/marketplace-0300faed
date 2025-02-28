# So9y.tn - Marketplace Platform

## Overview
So9y.tn is a modern marketplace platform that integrates with Shipper for product cloning and order fulfillment, featuring SMS notifications for order updates. The platform is designed to provide a seamless experience for both customers and administrators.

## Architecture & Technical Stack

### Frontend
- **React + TypeScript**: Using modern React patterns with TypeScript for type safety
- **TanStack Query**: For efficient server state management and data fetching
- **shadcn/ui + Tailwind CSS**: For beautiful, accessible, and responsive UI components
- **Wouter**: Lightweight routing solution
- **React Hook Form + Zod**: Form handling with strong validation

### Backend
- **Express.js**: Lightweight and flexible Node.js web framework
- **Drizzle ORM**: Type-safe database operations
- **In-Memory Storage**: Using MemStorage for development, easily switchable to PostgreSQL
- **RESTful API**: Well-structured endpoints for products, orders, and users

### Integrations
- **Shipper API**: Product cloning and order fulfillment
- **TunisieSMS**: Order status notifications
- **Sellmax**: External order confirmation (planned)

## Implemented Features

### Product Management
- Product listing with filtering and search
- Product cloning from Shipper
- Real-time inventory tracking
- Wholesale and retail pricing
- Image gallery support

### Order System
- Shopping cart functionality
- Order tracking
- SMS notifications
- Multiple order statuses
- Shipping address management

### Admin Dashboard
- Product management interface
- Order processing workflow
- Sales analytics
- Inventory monitoring

## Development Guidelines

### Code Organization
```
├── client/            # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── lib/         # Utility functions and API clients
│   │   ├── pages/       # Route components
│   │   └── hooks/       # Custom React hooks
├── server/            # Backend Express application
│   ├── routes.ts      # API endpoints
│   └── storage.ts     # Data storage interface
├── shared/            # Shared types and schemas
└── scripts/           # Utility scripts
```

### Best Practices
1. Use TypeScript for all new code
2. Follow the component patterns in `client/src/components`
3. Keep components small and focused
4. Use the storage interface for all data operations
5. Validate all inputs using Zod schemas
6. Handle errors gracefully with proper user feedback
7. Write clear commit messages following the pattern in `scripts/github-sync.ts`

### State Management
- Use TanStack Query for server state
- Implement optimistic updates for better UX
- Keep form state local using React Hook Form
- Use URL parameters for shareable filters

## Testing & Deployment

### Local Development
1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Access the application at `http://localhost:5000`

### Environment Variables
Required secrets:
- `SHIPPER_API_KEY`: For Shipper integration
- `TUNISIE_SMS_API_KEY`: For SMS notifications
- `GITHUB_TOKEN`: For repository synchronization

### Deployment
The application is configured for deployment on Replit and includes:
- Auto-restart on code changes
- Combined frontend and backend serving
- Static file optimization
- API route handling

## Future Development Roadmap

### Planned Features
1. Sellmax Integration
   - External order confirmation
   - Inventory synchronization
   - Price monitoring

2. Advanced Product Management
   - Bulk operations
   - Category management
   - Variant support

3. Real-time Features
   - Live inventory updates
   - Order status webhooks
   - Admin notifications

4. Analytics Dashboard
   - Sales reports
   - Customer insights
   - Inventory predictions

5. Multi-user System
   - Role-based access control
   - Team collaboration
   - Activity logging

### Integration Points
The codebase is prepared for future integrations with:
- Payment gateways
- Additional shipping providers
- Analytics services
- Marketing automation tools

## For AI Agents

### Key Files to Understand
1. `shared/schema.ts`: Data models and validation schemas
2. `server/storage.ts`: Storage interface implementation
3. `client/src/lib/api.ts`: External API integrations
4. `client/src/components/`: UI component patterns

### Development Approach
1. Always maintain type safety with TypeScript
2. Follow the established component patterns
3. Use the provided tools and utilities
4. Keep the storage interface abstract
5. Document changes in both code and markdown
6. Validate all external API interactions

### Common Patterns
1. Data fetching: Use TanStack Query with proper types
2. Forms: Use React Hook Form with Zod validation
3. UI Components: Extend shadcn/ui components
4. API Routes: Follow the pattern in `server/routes.ts`
5. Error Handling: Use the toast system for user feedback

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
This project is proprietary and confidential.