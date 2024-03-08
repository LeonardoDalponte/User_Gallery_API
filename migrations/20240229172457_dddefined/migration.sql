-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_user" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "images" (
    "image_id" SERIAL NOT NULL,
    "image_name" TEXT NOT NULL,
    "image_stored" TEXT NOT NULL,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image_size" DOUBLE PRECISION NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("image_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
