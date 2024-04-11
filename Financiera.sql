PGDMP  :                
    {           pruena    16.0    16.0     
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    pruena    DATABASE     y   CREATE DATABASE pruena WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Chile.1252';
    DROP DATABASE pruena;
                postgres    false                       0    0    DATABASE pruena    ACL     9   REVOKE CONNECT,TEMPORARY ON DATABASE pruena FROM PUBLIC;
                   postgres    false    4877            �            1259    16442    Derivs    TABLE     �   CREATE TABLE public."Derivs" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public."Derivs";
       public         heap    postgres    false            �            1259    16399    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �            1259    16454    simuls_incremento    SEQUENCE     z   CREATE SEQUENCE public.simuls_incremento
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.simuls_incremento;
       public          postgres    false            �            1259    16447    Simuls    TABLE     e  CREATE TABLE public."Simuls" (
    id integer DEFAULT nextval('public.simuls_incremento'::regclass) NOT NULL,
    rut integer,
    fecha date,
    monto integer,
    n_cuotas integer,
    "UF" numeric,
    interes integer,
    "Total_UF" numeric,
    "Cuota_UF" numeric,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public."Simuls";
       public         heap    postgres    false    222            �            1259    16414 
   Solicituds    TABLE     �  CREATE TABLE public."Solicituds" (
    id integer NOT NULL,
    nombre character varying(255),
    rut integer,
    fecha date,
    cargo character varying(255),
    tipo_prestamo integer,
    monto_total integer,
    precio_cuota numeric,
    n_cuotas integer,
    motivo text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    estado integer,
    derivada integer,
    interes integer
);
     DROP TABLE public."Solicituds";
       public         heap    postgres    false            �            1259    16413    Solicitudes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Solicitudes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Solicitudes_id_seq";
       public          postgres    false    219                       0    0    Solicitudes_id_seq    SEQUENCE OWNED BY     L   ALTER SEQUENCE public."Solicitudes_id_seq" OWNED BY public."Solicituds".id;
          public          postgres    false    218            �            1259    16405    Users    TABLE     %  CREATE TABLE public."Users" (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    cargo integer,
    pass character varying
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    16404    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    217                       0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    216            c           2604    16417    Solicituds id    DEFAULT     s   ALTER TABLE ONLY public."Solicituds" ALTER COLUMN id SET DEFAULT nextval('public."Solicitudes_id_seq"'::regclass);
 >   ALTER TABLE public."Solicituds" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            b           2604    16408    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217                      0    16442    Derivs 
   TABLE DATA           @   COPY public."Derivs" (id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   �"                  0    16399    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    215   #                 0    16447    Simuls 
   TABLE DATA           �   COPY public."Simuls" (id, rut, fecha, monto, n_cuotas, "UF", interes, "Total_UF", "Cuota_UF", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    221   @#                 0    16414 
   Solicituds 
   TABLE DATA           �   COPY public."Solicituds" (id, nombre, rut, fecha, cargo, tipo_prestamo, monto_total, precio_cuota, n_cuotas, motivo, "createdAt", "updatedAt", estado, derivada, interes) FROM stdin;
    public          postgres    false    219   �#                 0    16405    Users 
   TABLE DATA           [   COPY public."Users" (id, nombre, email, "createdAt", "updatedAt", cargo, pass) FROM stdin;
    public          postgres    false    217   _$                  0    0    Solicitudes_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Solicitudes_id_seq"', 30, true);
          public          postgres    false    218                       0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 7, true);
          public          postgres    false    216                       0    0    simuls_incremento    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.simuls_incremento', 4, true);
          public          postgres    false    222            n           2606    16446    Derivs Derivs_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Derivs"
    ADD CONSTRAINT "Derivs_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Derivs" DROP CONSTRAINT "Derivs_pkey";
       public            postgres    false    220            f           2606    16403     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    215            p           2606    16453    Simuls Simuls_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Simuls"
    ADD CONSTRAINT "Simuls_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Simuls" DROP CONSTRAINT "Simuls_pkey";
       public            postgres    false    221            l           2606    16421    Solicituds Solicitudes_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Solicituds"
    ADD CONSTRAINT "Solicitudes_pkey" PRIMARY KEY (id);
 I   ALTER TABLE ONLY public."Solicituds" DROP CONSTRAINT "Solicitudes_pkey";
       public            postgres    false    219            h           2606    16412    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    217            j           2606    16441    Users email 
   CONSTRAINT     I   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT email UNIQUE (email);
 7   ALTER TABLE ONLY public."Users" DROP CONSTRAINT email;
       public            postgres    false    217               ;   x�3��4202�54�52W0��2��26�335�50�#�el�E�D����F�W� :��          )   x�3202401� �&ƺ�E��%���ũEzY�\1z\\\ �<	         n   x�}��B1�s:4r�6��,�?�R�Z��1��zD�  +S�e��#�Fz�=�ڨ�Y�П��۫�5o�`5�v��,���4Rt��+s8&��jOo�� ̙)�         �   x�u���0��34��8v2 Sp	(RA���]��'@ �����p�: �H"�:���G�<���1"BR���m�׷톬D-Ѽv�C.�<�,��K. l��85��Q�>੮�,�`����j��cL�Y�qM�n�s/X�29         f   x�3�.-H-*�,�/�,H-�wH��K��4202�54�50R04�22�21�356�50�'e�ihd�e�阗��Y\�6����V �fz��&�������� �|&     