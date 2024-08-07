PGDMP                      |            pruena    16.2    16.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16400    pruena    DATABASE     y   CREATE DATABASE pruena WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Chile.1252';
    DROP DATABASE pruena;
                postgres    false            �            1259    16401    Derivs    TABLE     �   CREATE TABLE public."Derivs" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public."Derivs";
       public         heap    postgres    false            �            1259    16404    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �            1259    16407    simuls_incremento    SEQUENCE     z   CREATE SEQUENCE public.simuls_incremento
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.simuls_incremento;
       public          postgres    false            �            1259    16408    Simuls    TABLE     e  CREATE TABLE public."Simuls" (
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
       public         heap    postgres    false    217            �            1259    16414 
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
    interes integer,
    created_by integer
);
     DROP TABLE public."Solicituds";
       public         heap    postgres    false            �            1259    16419    Solicitudes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Solicitudes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Solicitudes_id_seq";
       public          postgres    false    219                       0    0    Solicitudes_id_seq    SEQUENCE OWNED BY     L   ALTER SEQUENCE public."Solicitudes_id_seq" OWNED BY public."Solicituds".id;
          public          postgres    false    220            �            1259    16420    Users    TABLE     %  CREATE TABLE public."Users" (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    cargo integer,
    pass character varying
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    16425    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    221                       0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    222            c           2604    16426    Solicituds id    DEFAULT     s   ALTER TABLE ONLY public."Solicituds" ALTER COLUMN id SET DEFAULT nextval('public."Solicitudes_id_seq"'::regclass);
 >   ALTER TABLE public."Solicituds" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            d           2604    16427    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221                      0    16401    Derivs 
   TABLE DATA           @   COPY public."Derivs" (id, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   �#                 0    16404    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    216   $                 0    16408    Simuls 
   TABLE DATA           �   COPY public."Simuls" (id, rut, fecha, monto, n_cuotas, "UF", interes, "Total_UF", "Cuota_UF", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   X$                 0    16414 
   Solicituds 
   TABLE DATA           �   COPY public."Solicituds" (id, nombre, rut, fecha, cargo, tipo_prestamo, monto_total, precio_cuota, n_cuotas, motivo, "createdAt", "updatedAt", estado, derivada, interes, created_by) FROM stdin;
    public          postgres    false    219   �$                 0    16420    Users 
   TABLE DATA           [   COPY public."Users" (id, nombre, email, "createdAt", "updatedAt", cargo, pass) FROM stdin;
    public          postgres    false    221   _&                  0    0    Solicitudes_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Solicitudes_id_seq"', 39, true);
          public          postgres    false    220                       0    0    Users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Users_id_seq"', 11, true);
          public          postgres    false    222                       0    0    simuls_incremento    SEQUENCE SET     A   SELECT pg_catalog.setval('public.simuls_incremento', 523, true);
          public          postgres    false    217            f           2606    16429    Derivs Derivs_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Derivs"
    ADD CONSTRAINT "Derivs_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Derivs" DROP CONSTRAINT "Derivs_pkey";
       public            postgres    false    215            h           2606    16431     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    216            j           2606    16433    Simuls Simuls_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Simuls"
    ADD CONSTRAINT "Simuls_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Simuls" DROP CONSTRAINT "Simuls_pkey";
       public            postgres    false    218            l           2606    16435    Solicituds Solicitudes_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Solicituds"
    ADD CONSTRAINT "Solicitudes_pkey" PRIMARY KEY (id);
 I   ALTER TABLE ONLY public."Solicituds" DROP CONSTRAINT "Solicitudes_pkey";
       public            postgres    false    219            n           2606    16437    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    221            p           2606    16439    Users email 
   CONSTRAINT     I   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT email UNIQUE (email);
 7   ALTER TABLE ONLY public."Users" DROP CONSTRAINT email;
       public            postgres    false    221            q           2606    16445    Solicituds foranea_createdby    FK CONSTRAINT     �   ALTER TABLE ONLY public."Solicituds"
    ADD CONSTRAINT foranea_createdby FOREIGN KEY (created_by) REFERENCES public."Users"(id) NOT VALID;
 H   ALTER TABLE ONLY public."Solicituds" DROP CONSTRAINT foranea_createdby;
       public          postgres    false    4718    221    219               m   x�}��	�0���j
/ !�ɉ�Y��M!�-�����c��F(��ra[��| �/4-���&���TO���^=,2�遄��g^����{\�p�)�Qp�oqEr����U5�         )   x�3202401� �&ƺ�E��%���ũEzY�\1z\\\ �<	         �   x�}��1D�N4���S�ׁY�"+z�y2�Jw'�Cp����P�O���*��o[lٛ�
,L>��hd{ ��N�E*�k���	����(���W�.[m�_h̗o�޶��zbr�*H
��w�-��٨��}�q�1�
�<�         S  x�m�MR�0���)z�x�cٲwl8���2��kq.�R���zz��g.�k;`�����2��a�:=���;` FDH9�	�_�];���s��rZ(US���D�'ȃ$h�[����q�8�Bk�KXĥ�A�۶�l+�e*ŏ���s/I��}��gC$�܁�ㆼ�|�bv�|z�k�1�y�y#��,p���;���V=��C.pF��!c'~�q�*T1*�f�K�p9�ݴ�.����$9�ٟXۜg���.AKǞ��*Y���P�Ѷa������E�=�b���M/O�ed��=s�k��$���s�9�|n����
�0|@��B         �   x���A�0���)�@���t�O��M���AKJ��
q�Ƹa�����+8��OSb��縻�t�E�T[f[��VF�UĂ5��s�bAJ?���덖�7�٘�l�L~����"��Cv�^a����'���-M�     