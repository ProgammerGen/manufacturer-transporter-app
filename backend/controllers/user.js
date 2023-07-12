import user from "../models/Users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js"
import dotenv from "dotenv"

dotenv.config()

export const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, user_type, address } =
      req.body
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !user_type ||
      !address
    ) {
      return next({
        status: 404,
        message: "Please fill all the required fields",
      })
    }

    const existingUser = await user.findOne({ email })
    if (existingUser) {
      return next({
        status: 409,
        message: "Email already exists",
      })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const userData = new user({
      first_name,
      last_name,
      email,
      password: hash,
      user_type,
      address,
    })

    await userData.save()

    res.status(200).json({ message: "User registered successfully" })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const foundUser = await user.findOne({ email: req.body.email })
    if (!foundUser) {
      return next(createError(404, "User not found"))
    }

    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      foundUser.password
    )
    if (!isPasswordMatched) {
      return next(createError(404, "Password is not matched!"))
    }

    const token = jwt.sign(
      { id: foundUser._id, role: foundUser.role, email: foundUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    const refreshToken = jwt.sign(
      { id: foundUser._id, role: foundUser.role, email: foundUser.email },
      process.env.JWT_REFRESH_SECRET
    )

    const { password, ...others } = foundUser._doc
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
      })
      .status(200)
      .json({
        details: { ...others },
        access_key: token,
        refresh_key: refreshToken,
      })
  } catch (err) {
    next(err)
  }
}

export const refreshTokens = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token

    if (!refreshToken) {
      return next(createError(401, "Refresh token not found"))
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return next(createError(403, "Invalid refresh token"))
      }

      const accessToken = jwt.sign(
        {
          id: decoded.id,
          role: decoded.role,
          email: decoded.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      )

      res
        .cookie("access_token", accessToken, {
          httpOnly: true,
        })
        .status(200)
        .json({ access_key: accessToken })
    })
  } catch (err) {
    next(err)
  }
}

export const logout = (req, res) => {
  res.clearCookie("access_token")
  res.clearCookie("refresh_token")

  res.status(200).json({ message: "Logout successful" })
}

export const viewUser = async (req, res, next) => {
  //   try {
  //     const user = await Users.find()
  //     const { password, ...others } = user
  //     res.status(200).json(user)
  //   } catch (err) {
  //     next(err)
  //   }
}
