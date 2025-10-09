# Install Composer packages without any interaction or console log
composer install --no-interaction --quiet

# .env file initialization
{
    echo 'APP_NAME="Tikera"'
    echo 'APP_ENV=local'
    echo 'APP_KEY='
    echo 'APP_DEBUG=true'

    # Change this if needed
    echo 'APP_TIMEZONE=UTC'
    
    echo 'APP_URL=http://localhost:8000'
    echo ''
    echo 'DB_CONNECTION=sqlite'

    # Change this if needed
    echo 'FILESYSTEM_DISK=local'
} > .env

# Generate the encryption key
php artisan key:generate

# Create an empty database\database.sqlite file, so we can run the migrations
touch database/database.sqlite

# Running migrations and seed the database
php artisan migrate:fresh --seed

# There is a possibility, that the public folder in the storage folder is missing,
# to create a symlink, we need at least an empty folder.
mkdir ./storage/app/public

# Create symlink, default: /public/storage ==> /storage/app/public
php artisan storage:link

# Run dev server
php artisan serve
